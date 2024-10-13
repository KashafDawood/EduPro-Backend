import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = process.env.GLOBAL_PREFIX;
  const port = process.env.PORT;

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
