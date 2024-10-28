import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, Employee } from 'src/user/user.schema';

@Module({
  providers: [TeacherService, TeacherResolver],
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    UserModule,
  ],
})
export class TeacherModule {}
