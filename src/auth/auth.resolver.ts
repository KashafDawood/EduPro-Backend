import { Mutation, Resolver, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { SignUpInput } from './dto/signUp-user.input';
import { SignInInput } from './dto/signIn-user.input';
import { AuthResponse } from './dto/auth-response.dto';
import { Response } from 'express';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

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
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return { accessToken, refreshToken };
  }

  @Mutation((returns) => User)
  signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return this.authService.signUp(signUpInput);
  }
}
