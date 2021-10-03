import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
  Logger
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  private readonly ctxPrefix: string = 'LoggingInterceptor';
  private readonly logger: Logger = new Logger(this.ctxPrefix);
  private userPrefix = '';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: FastifyRequest = ctx.getRequest();
    // const reply: FastifyReply = ctx.getResponse();
    const { method, url, body, headers } = request;
    const now = Date.now();

    this.logger.log('Before...');
    this.logger.log(`Incoming request - ${method} - ${url}`);

    // request.log.info('Some info about the current request');
    // this.logger.debug(
    //   {
    //     message,
    //     method,
    //     body,
    //     headers,
    //   },
    // );

    return next.handle().pipe(
      tap({
        next: (val: unknown): void => {
          this.logNext(val, context);
          this.logger.log('LOG', (val as any).response);
          this.logger.log(`After... ${Date.now() - now}ms`);
        },
        error: (err: Error): void => {
          this.logError(err, context);
          this.logger.log(err);
          this.logger.log(`After... ${Date.now() - now}ms`);
        }
      })
    );
  }

  /**
   * Logs the request response in success cases
   * @param body body returned
   * @param context details about the current request
   */
  private logNext(body: unknown, context: ExecutionContext): void {
    const req: FastifyRequest = context
      .switchToHttp()
      .getRequest<FastifyRequest>();
    const res: FastifyReply = context
      .switchToHttp()
      .getResponse<FastifyReply>();
    const { method, url } = req;
    const { statusCode } = res;
    const ctx = `Outgoing response - ${statusCode} - ${method} - ${url}`;

    this.logger.log(JSON.stringify(body), ctx);
  }

  /**
   * Logs the request response in error cases
   * @param error Error object
   * @param context details about the current request
   */
  private logError(error: Error, context: ExecutionContext): void {
    const req: FastifyRequest = context
      .switchToHttp()
      .getRequest<FastifyRequest>();
    const { method, url, body } = req;

    if (error instanceof HttpException) {
      const statusCode: number = error.getStatus();
      const ctx = `${this.userPrefix}${this.ctxPrefix} - ${statusCode} - ${method} - ${url}`;
      const message = `Outgoing response - ${statusCode} - ${method} - ${url}`;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(
          {
            method,
            url,
            // body,
            message,
            error
          },
          error.stack,
          ctx
        );
      } else {
        this.logger.warn(
          {
            method,
            url,
            error,
            // body,
            message
          },
          ctx
        );
      }
    } else {
      const errParsed = JSON.parse(JSON.stringify(error));
      this.logger.error(
        {
          message: `Outgoing response - ${method} - ${url}`
        },
        error.stack ? error.stack : 'stack trace not available',
        `Status Code: ${errParsed.statusCode} - ${method} - ${url}`,
        ''
      );
    }
  }
}
