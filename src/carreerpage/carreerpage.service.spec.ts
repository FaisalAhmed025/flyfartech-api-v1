import { Test, TestingModule } from '@nestjs/testing';
import { CarreerpageService } from './carreerpage.service';

describe('CarreerpageService', () => {
  let service: CarreerpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarreerpageService],
    }).compile();

    service = module.get<CarreerpageService>(CarreerpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
