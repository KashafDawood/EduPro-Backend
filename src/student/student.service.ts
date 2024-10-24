import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { Model } from 'mongoose';
import { CreateStudentInput } from './dto/create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const newStudent = new this.studentModel(createStudentInput);
    return newStudent.save();
  }

  async findAllStudent(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }
}
