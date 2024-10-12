import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');
  const port = configService.get<number>('PORT');

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
