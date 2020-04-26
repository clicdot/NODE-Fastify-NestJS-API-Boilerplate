import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as helmet from 'fastify-helmet';
import { AppModule } from './app.module';
import { GlobalInterceptor } from './common/interceptor/global.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';
import { HttpExceptionFilter } from './common/filters/errors.exception';
import { ResponseService } from './common/services/response/response.service';

async function bootstrap() {
  const responseSet = new ResponseService();
  responseSet.set(1);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // {
    //   logger: ['error', 'warn']
    // }
  );

  app.enableCors();
  app.register(helmet);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(responseSet));
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor(responseSet));

  // Swagger Docs
  const options = new DocumentBuilder()
    .setTitle('Spacee example')
    .setDescription('The Spacee API description')
    .setVersion('1.0')
    .addTag('Spacee')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
