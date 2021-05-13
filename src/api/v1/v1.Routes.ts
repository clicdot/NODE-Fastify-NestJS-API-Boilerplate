import { Routes } from 'nest-router';

import { AppComponentModule } from './components/app/app.module';

export const v1Routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/',
        module: AppComponentModule
      }
    ]
  }
];
