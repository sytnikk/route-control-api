import { Test, TestingModule } from '@nestjs/testing';
import { CarsStatusesController } from './cars-statuses.controller';

describe('CarsStatusesController', () => {
  let controller: CarsStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsStatusesController],
    }).compile();

    controller = module.get<CarsStatusesController>(CarsStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
