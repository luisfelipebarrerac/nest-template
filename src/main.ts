import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'src/common/enums';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // ENV Variables
  const port = configService.get(Configuration.PORT);
  const endpoint = configService.get(Configuration.API_PREFIX);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors[0]);
      },
    }),
  );
  app.setGlobalPrefix(endpoint);
  await app.listen(port, () => {
    console.log(
      `${new Date().toLocaleString()} \tServer running in port: ${port}`,
    );
  });
}

bootstrap();
