import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';

@Module({
  providers: [SubjectService, SubjectResolver]
})
export class SubjectModule {}
