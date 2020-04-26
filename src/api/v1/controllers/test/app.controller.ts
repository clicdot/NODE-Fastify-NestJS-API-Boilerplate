import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller('cat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new UnauthorizedException();
    // return this.appService.getHello();
    return 'hello';
  }
}
