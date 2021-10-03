import { Test, TestingModule } from '@nestjs/testing';
import { RedisHealthIndicator } from './redis-health-check.service';
// import { RedisService } from 'nestjs-redis';

describe('RedisHealthCheckService', () => {
  let service: RedisHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisHealthIndicator
        // {
        //   provide: RedisService,
        //   useValue: {
        //     getClient: jest.fn(),
        //   },
        // },
      ]
    }).compile();

    service = module.get<RedisHealthIndicator>(RedisHealthIndicator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
