import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from 'src/student/student.schema';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.dto';

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

  @Query((returns) => Student)
  findStudentById(@Args('studentId') studentId: string): Promise<Student> {
    return this.studentService.findStudentById(studentId);
  }

  @Mutation((returns) => Student)
  deleteStudent(@Args('studentId') studentId: string): Promise<Student> {
    return this.studentService.deleteStudent(studentId);
  }

  @Mutation((returns) => Student)
  updateStudent(
    @Args('studentId') studentId: string,
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    return this.studentService.updateStudent(studentId, updateStudentInput);
  }
}
