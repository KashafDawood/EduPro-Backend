import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Employee } from './Employee.schema';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.dto';

@Resolver((of) => Employee)
export class TeacherResolver {
  constructor(private teacherService: TeacherService) {}

  @Query((returns) => [Employee])
  findAllTeachers(): Promise<Employee[]> {
    return this.teacherService.findAll();
  }

  @Mutation((returns) => Employee)
  createTeacher(
    @Args('createTeacherInput') createTeacherInput: CreateTeacherInput,
  ): Promise<Employee> {
    return this.teacherService.createTeacher(createTeacherInput);
  }

  @Query(() => Employee)
  async findTeacherById(
    @Args('teacherId') teacherId: string,
  ): Promise<Employee> {
    return this.teacherService.findById(teacherId);
  }

  @Mutation(() => Employee)
  async deleteTeacher(@Args('teacherId') teacherId: string): Promise<Employee> {
    return this.teacherService.inactive(teacherId);
  }

  @Mutation(() => Employee)
  async updateTeacher(
    @Args('teacherId') teacherId: string,
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
  ): Promise<Employee> {
    return this.teacherService.update(teacherId, updateTeacherInput);
  }
}
