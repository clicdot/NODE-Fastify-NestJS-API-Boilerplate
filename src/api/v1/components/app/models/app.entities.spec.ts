import { Test, TestingModule } from '@nestjs/testing';
import { App } from './app.entities';

describe('App Entities', () => {
  let app: App;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: []
    }).compile();

    app = module.get<App>(App);
  });

  it('App - should be defined', () => {
    expect(app).toBeDefined();
  });
});
