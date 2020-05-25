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

  function reply() {
    const reply = {
      code (status) {
        console.log('STAUS', status);
        return this;
      },
      send (json) {
        console.log('JSON', json);
        return this;
      },
    };
  }

  describe('Reply ', () => {
    it('Reply type 1', async () => {
      const obj = {};
      const reply = {
        code (status) {
          console.log('STAUS', status);
          return this;
        },
        send (json) {
          console.log('JSON', json);
          return this;
        },
      };
      const expectedResult = {};
      const opt = {
        code: 200,
        func: {

        },
        msg: []
      };
      // console.log('RESPONSE', await service.reply(reply, opt));
      expect(await service.reply(reply, opt)).toMatchObject({expectedResult});
    });
  });
});
