import { Routes } from 'nest-router';

import { TestModule } from './controllers/test/test.module';

export const v1Routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/test',
        module: TestModule,
      },
    ],
  },
];
