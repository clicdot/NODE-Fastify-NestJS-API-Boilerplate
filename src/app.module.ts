import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ShutdownService } from './core/services/shutdown/shutdown.service';

import { V1Module } from './api/v1/v1.module';

import { MongoosedbModule } from './core/db/mongoose/mongoosedb.module';
import { HealthcheckController } from './api/components/healthcheck/healthcheck.controller';
import { VersionHealthIndicator } from './api/components/healthcheck/services/version-health-check.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true
      // envFilePath: '.env'
    }),
    MongoosedbModule,
    TerminusModule,
    V1Module
  ],
  controllers: [HealthcheckController],
  providers: [VersionHealthIndicator, ShutdownService]
})
export class AppModule {}
