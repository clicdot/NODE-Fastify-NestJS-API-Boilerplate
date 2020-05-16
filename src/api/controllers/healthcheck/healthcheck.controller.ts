import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  // DNSHealthIndicator,
  HealthCheck,
  // TypeOrmHealthIndicator
} from '@nestjs/terminus';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(
    private health: HealthCheckService,
    // private dns: DNSHealthIndicator,
    // private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // () => this.db.pingCheck('database', { timeout: 10000 }),
      // () => this.dns.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}
