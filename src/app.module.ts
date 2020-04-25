import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { V1Module } from './api/v1/v1.module';

// import { LoggerMiddleware } from './common/middleware/response.middleware';
import { ResponseService } from './common/services/response/response.service';


@Module({
  imports: [
    V1Module
  ],
  controllers: [],
  providers: [
    ResponseService
  ]
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes({ path: 'api/v1', method: RequestMethod.ALL });
  // }
}
