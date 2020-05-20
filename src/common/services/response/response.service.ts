import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResponseService {
  type: number;

  reply(reply: any, opt: any) {
    return reply
      .code(opt.code)
      .send({
        response: {
          code: opt.code,
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          function: opt.func,
          message: opt.msg
        }
      });
  }
}
