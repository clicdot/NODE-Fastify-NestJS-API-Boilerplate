'use strict';

import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private responseSvc) {}

  catch(error: Error, host: ArgumentsHost) {
    // const response = host.switchToHttp().getResponse();
    const errParsed = JSON.parse(JSON.stringify(error));
    const status = (error instanceof HttpException) ? error.getStatus() : errParsed && errParsed.statusCode ? errParsed.statusCode : HttpStatus.BAD_REQUEST;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();
    // console.log(error.message, HttpStatus);

    const opt = {
      code: status,
      msg: error.message,
      func: {
        method: request.method,
        url: (request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url,
        version: ((request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url).split('/')[2],
        ip: request.ip
      }
    };

    return this.responseSvc.reply(reply, opt);
  }
}
