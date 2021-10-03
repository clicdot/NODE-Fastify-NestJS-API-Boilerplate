import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from './app.module';
import { ApiConstants } from './core/constants/api.constants';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';

describe('AppModule (e2e)', () => {
  let app: NestFastifyApplication;
  let mongod;

  beforeEach(async () => {
    ApiConstants.MONGOOSETLSCERT = false;
    mongod = await MongoMemoryServer.create();
    process.env.MODE = 'LOCAL';
    process.env.MONGODB_URI = mongod.getUri();
    // let mongooseConfig =
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/ (GET)', (done) => {
    request(app.getHttpServer())
      .get('/healthcheck')
      // .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        console.log('ERROR', err);
        if (err) return done(err);
        console.log('RESULT', res.body);
        done();
      });
  });

  afterAll(async () => {
    await mongod.stop();
    await app.close();
  });
});
