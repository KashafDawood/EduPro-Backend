import { Module } from '@nestjs/common';
import { ConfigrationModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { StudentModule } from './student/student.module';

@Module({
  imports: [UserModule, AuthModule, ConfigrationModule, StudentModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
