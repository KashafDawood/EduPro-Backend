import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    UserModule,
  ],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
