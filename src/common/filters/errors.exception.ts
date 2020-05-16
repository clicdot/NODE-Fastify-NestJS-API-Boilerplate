'use strict';

import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private responseSvc) {}

  catch(error: Error, host: ArgumentsHost) {
    // const response = host.switchToHttp().getResponse();
    const status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.BAD_REQUEST;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();
    // console.log(error.message, HttpStatus);

    const opt = {
      code: status,
      msg: error.message,
      func: {
        method: request.method || request.raw.method,
        url: (request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url,
        version: ((request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url).split('/')[2],
        ip: (this.responseSvc.type === 1) ? request.ip : 'n/a'
      }
    };

    return this.responseSvc.reply(reply, opt);
  }
}
