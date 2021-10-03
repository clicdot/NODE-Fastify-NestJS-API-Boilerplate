import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { VersionHealthIndicator } from './version-health-check.service';
// import { RedisService } from 'nestjs-redis';

describe('RedisHealthCheckService', () => {
  let service: VersionHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersionHealthIndicator]
    }).compile();

    service = module.get<VersionHealthIndicator>(VersionHealthIndicator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call isHealthy', async () => {
    const healthy = await service.isHealthy('version');

    expect(healthy.version.status).toEqual('up');
    expect(healthy.version.version).not.toBeNull();
  });

  it('should call isHealthy and throw error', async () => {
    service.version = null;
    await expect(service.isHealthy('version')).rejects.toThrowError(
      BadRequestException
    );
  });
});
