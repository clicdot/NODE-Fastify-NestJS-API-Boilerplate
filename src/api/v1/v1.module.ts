import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { TestModule } from './controllers/test/test.module';

import { v1Routes } from './v1.Routes';

@Module({
  imports: [
    RouterModule.forRoutes(v1Routes),
    TestModule
  ],
  controllers: [

  ],
  providers: [

  ]
})
export class V1Module { }
