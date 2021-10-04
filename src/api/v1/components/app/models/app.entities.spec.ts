import { Test, TestingModule } from '@nestjs/testing';
import { App } from './app.entities';

describe('App Entities', () => {
  it('App - should be defined', () => {
    expect(App).toBeDefined();
  });
});
