import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.dto';
import { Teacher } from './teacher.schema';
import { BaseService } from 'src/base.service';

@Injectable()
export class TeacherService extends BaseService<Teacher> {
  constructor(@InjectModel(Teacher.name) private teacherModel: Model<Teacher>) {
    super(teacherModel);
  }
}
