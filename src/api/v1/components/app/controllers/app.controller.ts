import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { App } from './../models/app.entities';
import { AppInterface } from './../models/app.interface';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreateAppDto } from '../models/app.dto';

@ApiBearerAuth()
@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  find(): Promise<App[]> {
    return this.appService.find();
  }

  @Get('all')
  async findAll(): Promise<AppInterface[]> {
    return await this.appService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create app' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createAppDto: CreateAppDto): Promise<App[]> {
    return await this.appService.create(createAppDto);
  }
}
