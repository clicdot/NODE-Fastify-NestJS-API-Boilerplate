import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
import { AppModule } from './app.module';
import { GlobalInterceptor } from './core/interceptor/global.interceptor';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { ErrorsInterceptor } from './core/interceptor/errors.interceptor';
import { HttpExceptionFilter } from './core/filters/errors.exception';
import { ResponseService } from './core/services/response/response.service';

// import * as jwt from 'fastify-jwt';

interface NestApp {
  app: NestFastifyApplication;
}

const helmetPolicy =
  process.env.ENV === 'PROD'
    ? {}
    : {
        contentSecurityPolicy: false
      };

export async function start(): Promise<NestApp> {
  const responseSet = new ResponseService();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.get(ConfigService);

  app.enableCors();

  app.register(helmet, helmetPolicy);
  // app.register(jwt, {
  //   secret: {
  //     private: readFileSync(`${path.join(__dirname, 'KEYS')}/oauth-private.key`, 'utf8'),
  //     public: readFileSync(`${path.join(__dirname, 'KEYS')}/oauth-public.key`, 'utf8')
  //   },
  //   sign: {
  //     algorithm: 'RS256',
  //     audience: 'https://domain.com',
  //     issuer: 'api.domain.com',
  //     expiresIn: '1h'
  //   },
  //   verify: {
  //     audience: 'https://domain.com',
  //     issuer: 'api.domain.com'
  //   }
  // });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(responseSet));
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
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

  await app.init();
  return {
    app
  };
}
