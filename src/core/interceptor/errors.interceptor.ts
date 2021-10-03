import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface Response {
  response: any;
  data: any;
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorsInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const ctx = context.switchToHttp();
    return next.handle().pipe(
      // catchError((err) => {
      //   return throwError(err.response);
      // })
      tap({
        next: (val: unknown): void => {
          // console.log(3333, val);
          // this.logNext(val, context);
          // this.logger.error(`After... ${Date.now() - now}ms`);
        },
        error: (err: Error): void => {
          // console.log(4444, err);
          // this.logError(err, context);
          // this.logger.error(`After... ${Date.now() - now}ms`);
        }
      })
    );
  }
}
