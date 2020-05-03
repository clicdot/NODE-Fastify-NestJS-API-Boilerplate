// import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import * as helmet from 'fastify-helmet';
// import { AppModule } from './app.module';
// import { GlobalInterceptor } from './common/interceptor/global.interceptor';
// import { TransformInterceptor } from './common/interceptor/transform.interceptor';
// import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';
// import { HttpExceptionFilter } from './common/filters/errors.exception';
// import { ResponseService } from './common/services/response/response.service';
// import * as jwt from 'fastify-jwt';
// import * as path from 'path';
// import { readFileSync } from 'fs-extra';

import { start } from './fastify.bootsrap';

async function bootstrap() {
  const App = await start();
  const app = App.app;

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.listen(port, '0.0.0.0');
}

bootstrap();
