import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { SignInInput } from './dto/signIn-input';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => User)
  signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<any> {
    return this.authService.signIn(email, password);
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.authService.create(createUserInput);
  }
}
