import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { V1Module } from './api/v1/v1.module';

import { HealthcheckController } from './api/controllers/healthcheck/healthcheck.controller';
import { TokenController } from './api/controllers/token.controller';

import { ResponseService } from './common/services/response/response.service';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      envFilePath: './src/.env'
    }),
    V1Module
  ],
  controllers: [
    HealthcheckController,
    TokenController
  ],
  providers: [
    ResponseService
  ]
})
export class AppModule {}
