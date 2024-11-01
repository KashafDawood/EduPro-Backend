import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './Employee.schema';

@Module({
  providers: [TeacherService, TeacherResolver],
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
  ],
})
export class TeacherModule {}
