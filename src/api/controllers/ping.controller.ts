import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  getPing(): object {
    console.log('ping');
    return {
      hello: 'world'
    };
  }
}
