import { Module } from '@nestjs/common';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';

@Module({
  providers: [ClassResolver, ClassService]
})
export class ClassModule {}
