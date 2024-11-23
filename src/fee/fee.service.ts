import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { Fee } from './fee.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FeeService extends BaseService<Fee> {
  constructor(@InjectModel(Fee.name) private feeModel: Model<Fee>) {
    super(feeModel);
  }
}
