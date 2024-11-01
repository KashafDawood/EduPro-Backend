import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import {
  Teacher as Staff,
  TeacherSchema as StaffSchema,
} from 'src/teacher/teacher.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
  ],
  providers: [StaffService, StaffResolver],
})
export class StaffModule {}
