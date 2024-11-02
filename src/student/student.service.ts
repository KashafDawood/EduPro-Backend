import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';

@Injectable()
export class StudentService extends BaseService<Student> {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {
    super(studentModel);
    // const data = studentModel.aggregate([
    //   {
    //     $match:
    //       /**
    //        * query: The query in MQL.
    //        */
    //       {
    //         _id: ObjectId(id)
    //       }
    //   },
    // {
    //       $lookup: {
    //         from: "subjects",
    //         localField: "subajectId",
    //         foreignField: "_id",
    //         as: "subjects",
    //       },
        
    // }
    // ])
  }
}
