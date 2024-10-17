import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParse from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = process.env.GLOBAL_PREFIX;
  const port = process.env.PORT;

  app.use(cookieParse());

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
