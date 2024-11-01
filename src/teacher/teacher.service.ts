import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { Teacher } from './Employee.schema';
import { BaseService } from 'src/base.service';

@Injectable()
export class TeacherService extends BaseService<Teacher> {
  constructor(@InjectModel(Teacher.name) private teacherModel: Model<Teacher>) {
    super(teacherModel);
  }

  async createTeacher(
    createTeacherInput: CreateTeacherInput,
  ): Promise<Teacher> {
    //Todo
    // const { email, CNIC } = createTeacherInput;
    // const existingTeacher = await this.teacherModel.findOne({
    //   $or: [{ email }, { CNIC }],
    // });
    // if (existingTeacher) {
    //   throw new BadRequestException('Teacher already exists');
    // }
    const newTeacher = new this.teacherModel({
      ...createTeacherInput,
      role: 'teacher',
    });
    return newTeacher.save();
  }
}
