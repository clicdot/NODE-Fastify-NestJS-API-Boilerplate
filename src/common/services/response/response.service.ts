import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResponseService {
  type: number;

  reply(reply: any, opt: any) {
    // console.log(opt)
    if (this.type === 1) {
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
    } else {
      return reply
        .status(opt.code)
        .json({
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

  set(type) {
    return this.type = type;
  }
}
