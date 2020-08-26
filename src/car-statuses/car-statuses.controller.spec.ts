import { Test, TestingModule } from '@nestjs/testing';
import { CarStatusesController } from './car-statuses.controller';

describe('CarStatusesController', () => {
  let controller: CarStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarStatusesController],
    }).compile();

    controller = module.get<CarStatusesController>(CarStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
