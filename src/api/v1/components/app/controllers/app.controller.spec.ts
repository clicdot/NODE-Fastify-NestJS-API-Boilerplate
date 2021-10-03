import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('find', () => {
    it('should return JSON', async () => {
      expect(await appController.find()).toEqual([
        {
          name: 'test',
          version: 1,
          type: 'javascript'
        }
      ]);
    });
  });

  describe('findAll', () => {
    it('should return JSON', async () => {
      expect(await appController.findAll()).toEqual([
        {
          name: 'test',
          version: 1,
          type: 'javascript'
        }
      ]);
    });
  });

  describe('create', () => {
    it('should return JSON', async () => {
      expect(
        await appController.create({
          name: 'test',
          version: 1,
          type: 'javascript'
        })
      ).toEqual([
        {
          name: 'test',
          version: 1,
          type: 'javascript'
        }
      ]);
    });
  });
});
