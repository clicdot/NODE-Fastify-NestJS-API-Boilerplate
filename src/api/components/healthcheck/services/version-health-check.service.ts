import { Injectable, BadRequestException } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
const dir = process.cwd();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PKG = require(`${dir}/package.json`);

@Injectable()
export class VersionHealthIndicator extends HealthIndicator {
  version = PKG.version;

  constructor() {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const result = this.getStatus(key, this.version ? true : false, {
      version: this.version
    });
    if (this.version) {
      return result;
    }
    throw new BadRequestException('Redis failed');
  }
}
