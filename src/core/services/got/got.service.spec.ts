import { Test, TestingModule } from '@nestjs/testing';
import { GotService } from './got.service';

describe('GotService', () => {
  let service: GotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GotService]
    }).compile();

    service = module.get<GotService>(GotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
