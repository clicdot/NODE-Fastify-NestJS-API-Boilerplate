import { Controller, Get } from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AppService } from './services/app.service';

@ApiTags('Sample Cat')
@Controller('cat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({
    name: 'dsn'
  })
  @ApiResponse({
    status: 200,
    description: 'Sample record found'
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Sample not found'
  })
  getHello(): string {
    // throw new UnauthorizedException();
    return this.appService.getHello();
  }
}
