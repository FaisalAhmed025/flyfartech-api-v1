import { Test, TestingModule } from '@nestjs/testing';
import { CareertalkController } from './careertalk.controller';
import { CareertalkService } from './careertalk.service';

describe('CareertalkController', () => {
  let controller: CareertalkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareertalkController],
      providers: [CareertalkService],
    }).compile();

    controller = module.get<CareertalkController>(CareertalkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
