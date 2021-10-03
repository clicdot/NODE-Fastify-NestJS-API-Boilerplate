import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { HealthcheckController } from './healthcheck.controller';
import { VersionHealthIndicator } from './services/version-health-check.service';

class HealthCheckServiceMock {
  check() {
    return jest.fn();
  }
}

class MongooseHealthIndicatorMock {
  pingCheck() {
    return jest.fn();
  }
}

class VersionHealthIndicatorMock {
  isHealthy() {
    return jest.fn();
  }
}

describe('AppController', () => {
  let appController: HealthcheckController;
  let healthservice: HealthCheckService;
  let mongoose: MongooseHealthIndicator;
  let version: VersionHealthIndicator;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [
        {
          provide: HealthCheckService,
          useClass: HealthCheckServiceMock
        },
        {
          provide: MongooseHealthIndicator,
          useClass: MongooseHealthIndicatorMock
        },
        {
          provide: VersionHealthIndicator,
          useClass: VersionHealthIndicatorMock
        }
      ]
    }).compile();

    appController = app.get<HealthcheckController>(HealthcheckController);
    healthservice = app.get<HealthCheckService>(HealthCheckService);
    mongoose = app.get<MongooseHealthIndicator>(MongooseHealthIndicator);
    version = app.get<VersionHealthIndicator>(VersionHealthIndicator);
  });

  it('HealthcheckController - should be defined', () => {
    expect(appController).toBeDefined();
    expect(healthservice).toBeDefined();
    expect(mongoose).toBeDefined();
    expect(version).toBeDefined();
  });

  it('should call healthcheck', async () => {
    const result = await appController.check();

    jest
      .spyOn(healthservice, 'check')
      .mockImplementation(async () => await result);
    jest
      .spyOn(mongoose, 'pingCheck')
      .mockImplementation(async () => await Promise.resolve({}));
    jest
      .spyOn(version, 'isHealthy')
      .mockImplementation(async () => await Promise.resolve({}));
    expect(await healthservice.check([])).toEqual(result);
    expect(
      await mongoose.pingCheck('documentdb', {
        timeout: 5000
      })
    ).toEqual({});
    expect(await version.isHealthy('Version')).toEqual({});
  });
});
