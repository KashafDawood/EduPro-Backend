import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query((returns) => User, { nullable: true })
  userByEmail(@Args('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Mutation((returns) => User)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }
}
