import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { SignInInput } from './dto/signIn-user.input';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => User)
  signIn(@Args('signInInput') signInInput: SignInInput): Promise<any> {
    return this.authService.signIn(signInInput);
  }

  @Mutation((returns) => User)
  signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.authService.signUp(createUserInput);
  }
}
