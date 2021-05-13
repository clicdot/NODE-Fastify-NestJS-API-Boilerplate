import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { V1Module } from './api/v1/v1.module';

import * as fs from 'fs-extra';
let config = {};

try {
  if (fs.existsSync(__dirname + '/.env')) {
    config = {
      envFilePath: __dirname + '/.env'
    };
  }
} catch (err) {
  config = {
    ignoreEnvFile: true
  };
}

@Module({
  imports: [ConfigModule.forRoot(config), TerminusModule, V1Module],
  controllers: [],
  providers: []
})
export class AppModule {}
