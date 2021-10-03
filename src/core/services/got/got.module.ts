import { Module } from '@nestjs/common';
import { GotService } from './got.service';

@Module({
  providers: [GotService]
})
export class GotModule {}
