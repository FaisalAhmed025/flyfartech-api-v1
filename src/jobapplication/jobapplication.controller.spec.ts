import { Test, TestingModule } from '@nestjs/testing';
import { JobapplicationController } from './jobapplication.controller';
import { JobapplicationService } from './jobapplication.service';

describe('JobapplicationController', () => {
  let controller: JobapplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobapplicationController],
      providers: [JobapplicationService],
    }).compile();

    controller = module.get<JobapplicationController>(JobapplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
