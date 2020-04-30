'use strict';

import * as Fastify from 'fastify';
import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ResponseService } from './../src/common/services/response/response.service';
import { GlobalInterceptor } from './../src/common/interceptor/global.interceptor';
import { HttpExceptionFilter } from './../src/common/filters/errors.exception';
import { TransformInterceptor } from './../src/common/interceptor/transform.interceptor';
import { beforeEach, afterEach, tearDown } from 'tap';

let app: NestFastifyApplication;

beforeEach(async (done) => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  const responseSet = new ResponseService();
  responseSet.set(1);
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(responseSet));
  app.useGlobalInterceptors(new TransformInterceptor(responseSet));

  await app.init();
  done();
});

afterEach(async (done) => {
  done();
});

tearDown(async (done) => {
  // done();
});

function helperBuilder (t) {

  t.beforeEach(async (done) => {
    // done();
  });

  t.afterEach(async (done) => {
    // await app.close();
    // done();
  });

  // tear down our app after we are done
  t.tearDown((done) => {
    // done();
  });

  return app;
}

export const build = helperBuilder;
