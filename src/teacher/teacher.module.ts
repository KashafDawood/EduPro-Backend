import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './Employee.schema';

@Module({
  providers: [TeacherService, TeacherResolver],
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
})
export class TeacherModule {}
