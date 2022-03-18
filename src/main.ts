import { NestFactory } from '@nestjs/core';
import { InternalServerErrorException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as morgan from 'morgan';

import { TransformInterceptor } from './common/interceptors/response';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app.service';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const appConfig = app.get<AppConfigService>(AppConfigService);

    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new GlobalExceptionFilter());
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
