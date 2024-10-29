import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.dto';
import { Teacher } from './teacher.schema';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

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

  async findAllTeacher(): Promise<Teacher[]> {
    return this.teacherModel.find().exec();
  }

  async findTeacherById(teacherId: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(teacherId).exec();

    if (!teacher) {
      throw new NotFoundException(
        `Teacher not found with this ${teacherId} ID`,
      );
    }

    return teacher;
  }

  async deleteTeacher(teacherId: string): Promise<Teacher> {
    const deletedTeacher = await this.teacherModel.findByIdAndUpdate(
      teacherId,
      { active: false },
      { new: true, runValidators: true },
    );

    if (!deletedTeacher) {
      throw new NotFoundException(
        `Teacher not found with this ${teacherId} ID`,
      );
    }

    return deletedTeacher;
  }

  async updateTeacher(
    teacherId: string,
    updateTeacherInput: UpdateTeacherInput,
  ): Promise<Teacher> {
    const updatedTeacher = await this.teacherModel
      .findByIdAndUpdate(teacherId, updateTeacherInput, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedTeacher) {
      throw new NotFoundException(
        `Teacher not found with this ${teacherId} ID`,
      );
    }

    return updatedTeacher;
  }
}
