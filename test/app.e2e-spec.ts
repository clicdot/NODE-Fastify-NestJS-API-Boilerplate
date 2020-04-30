import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  it('/api/v1/test/cat (GET)', () => {
    app.inject({
      method: 'GET',
      url: '/api/v1/test/cat'
    })
    .then(({ payload }) => {
      console.log('PAYLOAD', payload);
      // expect(payload).toEqual('Hello world!');
    })
    .catch(e => console.log(e));
  });

  afterEach(async () => {
    await app.close();
  });
});
