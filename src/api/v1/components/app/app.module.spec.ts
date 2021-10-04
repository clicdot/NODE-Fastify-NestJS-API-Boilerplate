import { Test, TestingModule } from '@nestjs/testing';
import { AppComponentModule } from './app.module';

describe('AppService', () => {
  let appmodule: AppComponentModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppComponentModule],
      providers: []
    }).compile();

    appmodule = module.get<AppComponentModule>(AppComponentModule);
  });

  it('AppService - should be defined', () => {
    expect(appmodule).toBeDefined();
  });
});
