import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Response {
  response: any;
  data: any;
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const ctx = context.switchToHttp();
    return next
      .handle()
      .pipe(
        catchError(err => {
          console.log('ERROR', err);
          return throwError(err.response);
        })
      );
  }
}
