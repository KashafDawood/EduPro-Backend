import { Module } from '@nestjs/common';
import { ConfigrationModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
import { StaffModule } from './staff/staff.module';
import { ExpenseModule } from './expense/expense.module';
import { FeeModule } from './fee/fee.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigrationModule,
    StudentModule,
    TeacherModule,
    SubjectModule,
    ClassModule,
    StaffModule,
    ExpenseModule,
    FeeModule,
    FilesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
