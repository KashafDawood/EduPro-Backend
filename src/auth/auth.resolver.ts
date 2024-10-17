import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { SignUpInput } from './dto/signUp-user.input';
import { SignInInput } from './dto/signIn-user.input';
import { AuthResponse } from './dto/auth-response.dto';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => AuthResponse)
  signIn(@Args('signInInput') signInInput: SignInInput): Promise<any> {
    return this.authService.signIn(signInInput);
  }

  @Mutation((returns) => User)
  signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return this.authService.signUp(signUpInput);
  }
}
