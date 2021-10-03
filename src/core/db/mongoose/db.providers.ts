import { Provider } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose.service';

export const databaseProviders: Provider[] = [
  {
    inject: [],
    provide: 'DATABASE_CONNECTION',
    useClass: MongooseConfigService
  }
];
