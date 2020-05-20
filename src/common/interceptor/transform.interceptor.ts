import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export interface Response {
  response: any;
  data: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Response> {
  constructor(private responseSvc) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();

    const version = (request.raw.url).split('/')[2];

    const now = Date.now();
    return next.handle().pipe(map(data => {
      return ({ response: {
        code: reply.statusCode,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        function: {
          method: request.raw.method,
          url: request.raw.url,
          version,
          ip: (this.responseSvc.type === 1) ? request.ip : 'n/a'
        },
        responseTime: `${Date.now() - now}ms`
      }, data });
    }));
  }
}
