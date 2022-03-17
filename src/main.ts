import { NestFactory } from '@nestjs/core';
import { InternalServerErrorException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as morgan from 'morgan';

import { TransformInterceptor } from './common/interceptors/response';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const appConfig = app.get<AppConfigService>(AppConfigService);

    console.log(appConfig.env);

    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    app.setGlobalPrefix('/api/v1/');
    app.use(
      morgan(':method :url :status :res[content-length] - :response-time ms'),
    );
    await app.listen(appConfig.port ?? 3000);
  } catch (error) {
    throw new InternalServerErrorException(
      error?.message || 'Claims service is not responsive',
    );
  }
}
bootstrap();
