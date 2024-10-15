import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';

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
}
