// src/user/user.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(returns => User)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.userService.create({ name, email });
  }
}