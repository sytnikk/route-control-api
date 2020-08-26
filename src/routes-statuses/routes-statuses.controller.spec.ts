import { Test, TestingModule } from '@nestjs/testing';
import { RoutesStatusesController } from './routes-statuses.controller';

describe('RoutesStatusesController', () => {
  let controller: RoutesStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutesStatusesController],
    }).compile();

    controller = module.get<RoutesStatusesController>(RoutesStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
