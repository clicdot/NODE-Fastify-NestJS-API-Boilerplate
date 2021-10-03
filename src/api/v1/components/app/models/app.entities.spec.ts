import { Test, TestingModule } from '@nestjs/testing';
import { App } from './app.entities';

describe('App Entities', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: []
    }).compile();
  });

  it('App - should be defined', () => {
    expect(App).toBeDefined();
  });
});
