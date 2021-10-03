import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService]
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('AppService - should be defined', () => {
    expect(AppService).toBeDefined();
  });

  describe('find', () => {
    it('should get all', async () => {
      const app = await appService.find();
      expect(app).toEqual([
        {
          name: 'test',
          version: 1,
          type: 'javascript'
        }
      ]);
    });
  });

  describe('findAll', () => {
    it('should get all', async () => {
      const app = await appService.findAll();
      expect(app).toEqual([
        {
          name: 'test',
          version: 1,
          type: 'javascript'
        }
      ]);
    });
  });

  describe('findOne', () => {
    it('should get all', async () => {
      const app = await appService.findOne(1);
      expect(app).toEqual({
        name: 'test',
        version: 1,
        type: 'javascript'
      });
    });
  });
});
