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

  async createSubject(
    createSubjectInput: CreateSubjectInput,
  ): Promise<Subject> {
    return this.create(createSubjectInput);
  }

  async findAllSubject(): Promise<Subject[]> {
    return this.findAll();
  }

  async findSubjectById(id: string): Promise<Subject> {
    return this.findById(id);
  }

  async deleteSubject(id: string): Promise<Subject> {
    return this.delete(id);
  }

  async updateSubject(
    id: string,
    updateSubjectInput: UpdateSubjectInput,
  ): Promise<Subject> {
    return this.update(id, updateSubjectInput);
  }
}
