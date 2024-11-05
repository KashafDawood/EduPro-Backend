import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async getTeacherById(id: string): Promise<Teacher> {
    const data = await this.teacherModel
      .aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'subjects',
            localField: 'Subject',
            foreignField: '_id',
            as: 'subjectData',
          },
        },
        {
          $lookup: {
            from: 'classes',
            localField: 'Class',
            foreignField: '_id',
            as: 'classData',
          },
        },
      ])
      .exec();

    return data[0];
  }
}
