import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
import multipart from 'fastify-multipart';
import compression from 'fastify-compress';
import { AppModule } from './app.module';
import { GlobalInterceptor } from './core/interceptor/global.interceptor';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { ErrorsInterceptor } from './core/interceptor/errors.interceptor';
import { HttpExceptionFilter } from './core/filters/errors.exception';
import { ResponseService } from './core/services/response/response.service';
// import * as os from 'os';
// import onResponse from './core/services/response/onResponse';
// import jwt from 'fastify-jwt';

const helmetPolicy =
  process.env.ENV === 'PROD'
    ? {}
    : {
        contentSecurityPolicy: false
      };

export async function start(): Promise<NestFastifyApplication> {
  const responseSet = new ResponseService();

  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        logger: {
          level: 'info'
        },
        bodyLimit: 24971520
      })
    );
  // app.useLogger(app.get(Logger));
  app.get(ConfigService);

  if (process.env.MODE !== 'LOCAL') {
    app.enableShutdownHooks();
  }

  app.enableCors();

  app.register(helmet, helmetPolicy);
  app.register(compression, { encodings: ['gzip', 'deflate'] });

  app.register(multipart);

  // app.register(onResponse);
  // app.register(jwt, {
  //   secret: 'd3ErVy8bQXUbfqzg7dRLCvbNak2bqk77iDXN6N4tiQNq8upqGhNPbxVXMePqU6pB',
  //   // secret: {
  //   //   private: readFileSync(`${path.join(__dirname, 'KEYS')}/oauth-private.key`, 'utf8'),
  //   //   public: readFileSync(`${path.join(__dirname, 'KEYS')}/oauth-public.key`, 'utf8')
  //   // },
  //   sign: {
  //     algorithm: 'RS256',
  //     audience: `https://${os.hostname()}.api.visa.com`,
  //     issuer: `${os.hostname()}.api.visa.com`,
  //     // expiresIn: '1h',
  //   },
  //   verify: {
  //     audience: `https://${os.hostname()}.api.visa.com`,
  //     issuer: ${os.hostname()}.api.visa.com`,
  //   },
  // });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(responseSet));
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor(responseSet));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  // Swagger Docs
  const options = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCR)
    .setVersion(process.env.SWAGGER_VS)
    .addTag('Swagger')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  return app;
}
