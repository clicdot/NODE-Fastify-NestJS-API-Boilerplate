import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { AppComponentModule } from './components/app/app.module';

import { v1Routes } from './v1.Routes';

@Module({
  imports: [RouterModule.forRoutes(v1Routes), AppComponentModule],
  controllers: [],
  providers: []
})
export class V1Module {}
