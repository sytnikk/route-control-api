import { Test, TestingModule } from '@nestjs/testing';
import { RouteStatusesController } from './route-statuses.controller';

describe('RouteStatusesController', () => {
  let controller: RouteStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouteStatusesController],
    }).compile();

    controller = module.get<RouteStatusesController>(RouteStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
