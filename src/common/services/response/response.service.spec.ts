import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Reply ', () => {
    it('Should get data', async () => {
      const type = 1;
      expect(await service.set(type)).toBe(type);
    });

    it('Reply type 1', async () => {
      const type = 1;
      expect(await service.set(type)).toBe(type);
      const reply = {
        code (status) {
          console.log(status);
          return this;
        },
        send (json) {
          console.log(json);
          return this;
        },
      };
      const expectedResult = {};
      const opt = {};

      expect(await service.reply(reply, opt)).toMatchObject(expectedResult);
    });

    it('Reply type 2', async () => {
      const reply = {
        status (status) {
          console.log(status);
          return this;
        },
        json (json) {
          console.log(json);
          return this;
        },
      };
      const expectedResult = {};
      const opt = {};

      expect(await service.reply(reply, opt)).toMatchObject(expectedResult);
    });
  });
});
