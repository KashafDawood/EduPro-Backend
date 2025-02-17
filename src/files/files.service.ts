import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { File } from './files.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FilesService extends BaseService<File> {
  constructor(@InjectModel(File.name) private filesModel: Model<File>) {
    super(filesModel);
  }
}
