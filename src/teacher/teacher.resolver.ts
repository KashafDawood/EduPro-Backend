import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { TeacherService } from './teacher.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { CreateTeacherInput } from './dto/create-teacher.input';

@Resolver((of) => User)
export class TeacherResolver {
  constructor(
    private userService: UserService,
    private teacherService: TeacherService,
  ) {}

  @Mutation((returns) => User)
  createTeacher(
    @Args('createTeacherInput') createTeacherInput: CreateTeacherInput,
  ): Promise<User> {
    return this.teacherService.createTeacher(createTeacherInput);
  }
}
