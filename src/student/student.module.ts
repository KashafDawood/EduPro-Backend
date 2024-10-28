import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
