import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private responseSvc) {}

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();
    const status = exception.getStatus();
    console.log(request);
    const opt = {
      code: status,
      msg: exception.message,
      func: {
        method: request.method || request.raw.method,
        url: (request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url,
        version: ((request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url).split('/')[2],
        ip: (this.responseSvc.type === 1) ? request.ip : 'n/a'
      }
    };

    return this.responseSvc.reply(reply, opt);

    // return reply
    //   .code(status)
    //   .send({
    //     response: {
    //       code: status,
    //       id: uuidv4(),
    //       timestamp: new Date().toISOString(),
    //       function: {},
    //       message: exception.message
    //     }
    //   });
  }
}
