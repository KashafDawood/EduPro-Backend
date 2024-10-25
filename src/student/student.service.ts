import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findStudentById(studentId: string): Promise<Student> {
    const student = await this.studentModel.findById(studentId).exec();

    if (!student) {
      throw new NotFoundException(
        `Student not found with this ${studentId} ID`,
      );
    }

    return student;
  }

  async deleteStudent(studentId: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      { active: false },
      { new: true, runValidators: true },
    );

    if (!deletedStudent) {
      throw new NotFoundException(
        `Student not found with this ${studentId} ID`,
      );
    }

    return deletedStudent;
  }
}
