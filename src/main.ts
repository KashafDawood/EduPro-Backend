import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParse from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = process.env.GLOBAL_PREFIX;
  const port = process.env.PORT;

  app.enableCors({
    origin: process.env.FE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use((req, res, next) => {
    res.cookie('cookieName', 'cookieValue', {
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    next();
  });

  app.use(cookieParse());

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
