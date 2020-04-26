import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from './api/v1/v1.module';

// import { LoggerMiddleware } from './common/middleware/response.middleware';
import { ResponseService } from './common/services/response/response.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/.env'
    }),
    V1Module
  ],
  controllers: [],
  providers: [
    ResponseService
  ]
})
export class AppModule {}
