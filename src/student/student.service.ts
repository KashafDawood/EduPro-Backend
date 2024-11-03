import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';
import { Types } from 'mongoose';

@Injectable()
export class StudentService extends BaseService<Student> {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {
    super(studentModel);
  }

  async getStudentById(id: string): Promise<Student> {
    const data = await this.studentModel
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
        // {
        //   $lookup: {
        //     from: 'subjects',
        //     localField: 'Subject',
        //     foreignField: '_id',
        //     as: 'subjectData',
        //   },
        // },
      ])
      .exec();

    return data[0];
  }
}
