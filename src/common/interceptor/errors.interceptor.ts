import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export interface Response {
  response: any;
  data: any;
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    return next
      .handle()
      .pipe(
        catchError(err => {
          return throwError(err.response);
        })
      );
  }
}
