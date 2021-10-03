'use strict';

import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  CallHandler,
  Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ErrorInterceptor');

  constructor(private responseSvc) {}

  catch(error: Error, host: ArgumentsHost) {
    // const response = host.switchToHttp().getResponse();
    const errParsed = JSON.parse(JSON.stringify(error));
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : errParsed && errParsed.statusCode
        ? errParsed.statusCode
        : HttpStatus.BAD_REQUEST;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();

    reply.header('Cache-Control', 'no-cache, no-store, max-age=0');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', '-1');

    const { method, url, body, headers } = request;

    const opt = {
      code: status,
      msg: error.message
      // func: {
      //   method: request.method,
      //   // url:
      //   //   request._parsedUrl && request._parsedUrl.path
      //   //     ? request._parsedUrl.path
      //   //     : request.raw.url,
      //   // version: (request._parsedUrl && request._parsedUrl.path
      //   //   ? request._parsedUrl.path
      //   //   : request.raw.url
      //   // ).split('/')[2],
      //   // ip: request.ip,
      // },
    };

    this.logger.error(`${method} - ${url} - ${status} - ${error.message}`);

    return this.responseSvc.reply(
      reply,
      opt,
      status === 503 ? errParsed.response : null
    );
  }
}
