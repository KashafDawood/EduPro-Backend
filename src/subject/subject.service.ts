import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base.service';
import { Subject } from './subject.schema';
import { Model } from 'mongoose';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.dto';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<Subject>) {
    super(subjectModel);
  }
}
