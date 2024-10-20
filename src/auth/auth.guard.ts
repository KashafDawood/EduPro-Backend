import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/publicRoute.decorator';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.schema';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request: Request = ctx.getContext().req;

    let token: string;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      token = request.headers.authorization.split(' ')[1];
    } else if (request.cookies && request.cookies.accessToken) {
      token = request.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedException(
        'You are not logged in, Please login to get access!',
      );
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      const currentUser = await this.userService.findById(decoded.sub);
      if (!currentUser) {
        throw new UnauthorizedException(
          'The user belonging to this token no longer exists',
        );
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        throw new UnauthorizedException(
          'User recently changed password! Please log in again.',
        );
      }

      request.user = currentUser;
      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired! Please refresh it');
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
