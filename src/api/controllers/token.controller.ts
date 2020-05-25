import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class TokenController {
  @Post('token')
  postToken() {
    return {
      hello: 'world'
    };
  }
}
