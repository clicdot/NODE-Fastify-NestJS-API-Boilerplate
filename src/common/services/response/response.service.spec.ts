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
    it('Reply type 1', async () => {
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
  });
});
