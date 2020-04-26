import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import { V1Module } from './api/v1/v1.module';

import { TokenController } from './api/controllers/token.controller';
import { PingController } from './api/controllers/ping.controller';

import { ResponseService } from './common/services/response/response.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/.env'
    }),
    V1Module
  ],
  controllers: [
    PingController,
    TokenController
  ],
  providers: [
    ResponseService
  ]
})
export class AppModule {}
