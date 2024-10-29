import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.schema';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => Teacher)
export class TeacherResolver {
  constructor(private teacherService: TeacherService) {}

  @Query((returns) => [Teacher])
  findAllTeachers(): Promise<Teacher[]> {
    return this.teacherService.findAllTeacher();
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
    return this.teacherService.findTeacherById(teacherId);
  }

  @Mutation(() => Teacher)
  async deleteTeacher(@Args('teacherId') teacherId: string): Promise<Teacher> {
    return this.teacherService.deleteTeacher(teacherId);
  }

  @Mutation(() => Teacher)
  async updateTeacher(
    @Args('teacherId') teacherId: string,
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
  ): Promise<Teacher> {
    return this.teacherService.updateTeacher(teacherId, updateTeacherInput);
  }
}
