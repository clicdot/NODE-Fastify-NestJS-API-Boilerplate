// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// // import { Request, Response } from 'express';
// import { Observable } from 'rxjs';
// import { v4 as uuidv4 } from 'uuid';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   constructor(private responseSvc) {}

//   catch(exception: HttpException, host: ArgumentsHost): Observable<any> {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest();
//     const reply = ctx.getResponse();
//     const status = exception.getStatus();

//     const opt = {
//       code: status,
//       msg: exception.message,
//       func: {
//         method: request.method || request.raw.method,
//         url: (request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url,
//         version: ((request._parsedUrl && request._parsedUrl.path) ? request._parsedUrl.path : request.raw.url).split('/')[2],
//         ip: (this.responseSvc.type === 1) ? request.ip : 'n/a'
//       }
//     };

//     return this.responseSvc.reply(reply, opt);

//     // return reply
//     //   .code(status)
//     //   .send({
//     //     response: {
//     //       code: status,
//     //       id: uuidv4(),
//     //       timestamp: new Date().toISOString(),
//     //       function: {},
//     //       message: exception.message
//     //     }
//     //   });
//   }
// }

import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private responseSvc) {}

  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.BAD_REQUEST;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();
    console.log(error.message, HttpStatus);
    // if (status === HttpStatus.UNAUTHORIZED)
    //     return response.status(status).render('views/401');
    // if (status === HttpStatus.NOT_FOUND)
    //     return response.status(status).render('views/404');
    // if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    //     if (process.env.NODE_ENV === 'production') {
    //       console.error(error.stack);
    //       return response.status(status).render('views/500');
    //     }
    //     else {
    //       const message = error.stack;
    //       return response.status(status).send(message);
    //     }
    // }

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
