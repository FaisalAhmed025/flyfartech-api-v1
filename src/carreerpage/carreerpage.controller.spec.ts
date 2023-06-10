import { Test, TestingModule } from '@nestjs/testing';
import { CarreerpageController } from './carreerpage.controller';
import { CarreerpageService } from './carreerpage.service';

describe('CarreerpageController', () => {
  let controller: CarreerpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarreerpageController],
      providers: [CarreerpageService],
    }).compile();

    controller = module.get<CarreerpageController>(CarreerpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
