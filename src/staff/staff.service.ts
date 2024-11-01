import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';
import { Teacher as Staff } from 'src/teacher/teacher.schema';

@Injectable()
export class StaffService extends BaseService<Staff> {
  constructor(@InjectModel(Staff.name) private staffModel: Model<Staff>) {
    super(staffModel);
  }
}
