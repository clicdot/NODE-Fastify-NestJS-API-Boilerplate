import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export interface Response {
  response: any;
  data: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Response> {
  private readonly ctxPrefix: string = 'DataInterceptor';
  private readonly logger: Logger = new Logger(this.ctxPrefix);

  constructor(private responseSvc) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();

    reply.header('Cache-Control', 'no-cache, no-store, max-age=0');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', '-1');

    const version = request.raw.url.split('/')[2];

    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        const result = {
          response: {
            code: reply.statusCode,
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            // function: {
            //   method: request.raw.method,
            //   url: request.raw.url,
            //   version,
            //   // ip: request.ip,
            // },
            responseTime: `${Date.now() - now}ms`
          },
          data
        };
        // self.logger.log(result);
        return result;
      })
    );
  }
}
