import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './Employee.schema';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.dto';

@Resolver((of) => Teacher)
export class TeacherResolver {
  constructor(private teacherService: TeacherService) {}

  @Query((returns) => [Teacher])
  findAllTeachers(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Mutation((returns) => Teacher)
  createTeacher(
    @Args('createTeacherInput') createTeacherInput: CreateTeacherInput,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherInput);
  }

  @Query(() => Teacher)
  async findTeacherById(
    @Args('teacherId') teacherId: string,
  ): Promise<Teacher> {
    return this.teacherService.getTeacherById(teacherId);
  }

  @Mutation(() => Teacher)
  async deleteTeacher(@Args('teacherId') teacherId: string): Promise<Teacher> {
    return this.teacherService.inactive(teacherId);
  }

  @Mutation(() => Teacher)
  async updateTeacher(
    @Args('teacherId') teacherId: string,
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
  ): Promise<Teacher> {
    return this.teacherService.update(teacherId, updateTeacherInput);
  }
}
