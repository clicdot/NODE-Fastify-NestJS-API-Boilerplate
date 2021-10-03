import { Injectable, BadRequestException } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
// import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  // private client = this.redis.getClient();

  constructor() {
    super();
  }

  // async isHealthy(key: string): Promise<HealthIndicatorResult> {
  //   await this.client.ping();
  //   const result = this.getStatus(
  //     key,
  //     this.client.status === 'ready' ? true : false,
  //     { ping: await this.client.ping(), redis: this.client.status },
  //   );
  //   if (this.client.status === 'ready') {
  //     return result;
  //   }
  //   throw new BadRequestException('Redis failed');
  // }
}
