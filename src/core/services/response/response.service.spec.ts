import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService]
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Reply ', () => {
    it('Reply type 1', async () => {
      const reply = {
        data: {},
        code(status) {
          return this;
        },
        send(json) {
          this.data = json;
          return this.data;
        }
      };
      const expectedResult = {};
      const opt = {
        code: 200,
        func: {
          method: 'GET',
          url: '/api/v1',
          version: 'v1',
          ip: '127.0.0.1'
        },
        msg: 'Test'
      };

      const result = await service.reply(reply, opt);
      expect(result).toMatchObject(expectedResult);
      expect(result).toBeTruthy();
      expect(result.response.code).toEqual(200);
      expect(result.response.function.method).toBe('GET');
      expect(result.response.function.url).toBe('/api/v1');
      expect(result.response.function.version).toBe('v1');
    });
  });
});
