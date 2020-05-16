import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as helmet from 'fastify-helmet';
import { AppModule } from './app.module';
import { GlobalInterceptor } from './common/interceptor/global.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
// import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';
import { HttpExceptionFilter } from './common/filters/errors.exception';
import { ResponseService } from './common/services/response/response.service';
import * as fastify from 'fastify';
import * as jwt from 'fastify-jwt';
import * as path from 'path';
import { readFileSync } from 'fs-extra';

interface NestApp {
  app: NestFastifyApplication;
  instance: fastify.FastifyInstance;
}

export async function start(): Promise<NestApp> {
  const responseSet = new ResponseService();
  responseSet.set(1);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // {
    //   logger: ['error', 'warn']
    // }
  );
  app.get(ConfigService);

  const instance: fastify.FastifyInstance = fastify({});

  app.enableCors();
  app.register(helmet);
  app.register(jwt, {
    secret: {
      private: readFileSync(`${path.join(__dirname, 'KEYS')}/oauth-private.key`, 'utf8'),
      public: readFileSync(`${path.join(__dirname, 'KEYS')}/oauth-public.key`, 'utf8')
    },
    sign: {
      algorithm: 'RS256',
      audience: 'https://domain.com',
      issuer: 'api.domain.com',
      expiresIn: '1h'
    },
    verify: {
      audience: 'https://domain.com',
      issuer: 'api.domain.com'
    }
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(responseSet));
  app.useGlobalInterceptors(new GlobalInterceptor());
  // app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor(responseSet));

  // Swagger Docs
  const options = new DocumentBuilder()
    .setTitle('Swagger example')
    .setDescription('The SpSwaggeracee API description')
    .setVersion('1.0')
    .addTag('Swagger')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.init();
  return {
    app,
    instance
  };
}
