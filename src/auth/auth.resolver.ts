import { Mutation, Resolver, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { SignUpInput } from './dto/signUp-user.input';
import { SignInInput } from './dto/signIn-user.input';
import { AuthResponse } from './dto/auth-response.dto';
import { Request, Response } from 'express';
import { RefreshAccessTokenResponse } from './dto/refresh-AccessToken.dto';
import { Public } from 'src/decorators/publicRoute.decorator';
import { UpdatePasswordInput } from './dto/update-password.input';
import { ForgetPasswordInput } from './dto/forget-password.input';
import { UnauthorizedException } from '@nestjs/common';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation((returns) => AuthResponse)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context('res') res: Response,
  ): Promise<any> {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInInput);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(
        Date.now() + Number(process.env.ACCESS_COOKIE_EXPIRES_IN) * 60 * 1000,
      ),
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(
        Date.now() +
          Number(process.env.REFRESH_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      ),
    });

    return { accessToken, refreshToken };
  }

  @Public()
  @Mutation((returns) => RefreshAccessTokenResponse)
  async refreshAccessToken(
    @Args('id') id: string,
    @Context('res') res: Response,
    @Context('req') req: Request,
  ): Promise<any> {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new Error('No Refresh Token found');
    }

    const accessToken = await this.authService.refreshAcessToken(
      id,
      refreshToken,
    );

    if (!accessToken) {
      throw new Error('Unable to refresh access token');
    }

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(
        Date.now() + Number(process.env.ACCESS_COOKIE_EXPIRES_IN) * 60 * 1000,
      ),
    });

    return { accessToken };
  }

  @Public()
  @Mutation((returns) => User)
  signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return this.authService.signUp(signUpInput);
  }

  // @Query((returns) => User)
  // async me(@Context('req') req: Request): Promise<User> {
  //   const accessToken = req.cookies['accessToken'];
  //   if (!accessToken) {
  //     throw new UnauthorizedException('No access token found');
  //   }
  //   return this.authService.me(accessToken);
  // }

  @Mutation((returns) => User)
  async me(@Args('accessToken') accessToken: string): Promise<User> {
    return this.authService.me(accessToken);
  }

  @Mutation((returns) => User)
  updatePassword(
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput,
    @Context() context: { req: Request },
  ): Promise<User> {
    const { req } = context;
    return this.authService.updatePassword(req, updatePasswordInput);
  }

  @Public()
  @Mutation((returns) => User)
  forgetPassword(
    @Args('forgetPasswordInput') forgetPasswordInput: ForgetPasswordInput,
  ): Promise<User> {
    return this.authService.forgetPassword(forgetPasswordInput);
  }

  @Public()
  @Mutation((returns) => Boolean)
  logout(
    @Context('res') res: Response,
    @Context('req') req: Request,
  ): Promise<boolean> {
    const accessToken = req.cookies['accessToken'];
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return this.authService.logout(accessToken);
  }
}
