import { Module } from '@nestjs/common';
import { ConfigrationModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule, ConfigrationModule],
})
export class AppModule {}
