import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/user/user.schema';
import { CreateTeacherInput } from './dto/create-teacher.input';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async createTeacher(
    createTeacherInput: CreateTeacherInput,
  ): Promise<Employee> {
    const newTeacher = new this.employeeModel({
      ...createTeacherInput,
      role: 'teacher',
    });
    return newTeacher.save();
  }
}
