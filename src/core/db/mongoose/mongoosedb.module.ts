import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { databaseProviders } from './db.providers';
import { MongooseConfigService } from './mongoose.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    })
  ],
  providers: [],
  exports: []
})
export class MongoosedbModule {}
