import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { Model } from 'mongoose';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.dto';
import { BaseService } from 'src/base.service';

@Injectable()
export class StudentService extends BaseService<Student> {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {
    super(studentModel);
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.create(createStudentInput);
  }

  async findAllStudent(): Promise<Student[]> {
    return this.findAll();
  }

  async findStudentById(studentId: string): Promise<Student> {
    return this.findById(studentId);
  }

  async deleteStudent(studentId: string): Promise<Student> {
    return this.delete(studentId);
  }

  async updateStudent(
    studentId: string,
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    return this.update(studentId, updateStudentInput);
  }
}
