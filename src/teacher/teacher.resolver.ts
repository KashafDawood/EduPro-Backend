import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { TeacherService } from './teacher.service';
import { Employee } from 'src/user/user.schema';
import { CreateTeacherInput } from './dto/create-teacher.input';

@Resolver((of) => Employee)
export class TeacherResolver {
  constructor(
    private userService: UserService,
    private teacherService: TeacherService,
  ) {}

  @Mutation((returns) => Employee)
  createTeacher(
    @Args('createTeacherInput') createTeacherInput: CreateTeacherInput,
  ): Promise<Employee> {
    return this.teacherService.createTeacher(createTeacherInput);
  }
}
