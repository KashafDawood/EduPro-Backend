import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from 'src/student/student.schema';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/create-student.input';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation((returns) => Student)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query((returns) => [Student])
  findAllStudent(): Promise<Student[]> {
    return this.studentService.findAllStudent();
  }
}
