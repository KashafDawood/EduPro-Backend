import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './class.schema';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';

@Injectable()
export class ClassService extends BaseService<Class> {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {
    super(classModel);
  }
}
