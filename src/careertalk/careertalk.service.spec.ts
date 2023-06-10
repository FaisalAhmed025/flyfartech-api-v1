import { Test, TestingModule } from '@nestjs/testing';
import { CareertalkService } from './careertalk.service';

describe('CareertalkService', () => {
  let service: CareertalkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareertalkService],
    }).compile();

    service = module.get<CareertalkService>(CareertalkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
