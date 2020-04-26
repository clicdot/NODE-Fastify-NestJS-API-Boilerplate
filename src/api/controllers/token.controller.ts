import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class TokenController {
  @Post('token')
  postToken(): object {
    return {
      hello: 'world'
    };
  }
}
