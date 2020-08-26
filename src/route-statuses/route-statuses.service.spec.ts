import { Test, TestingModule } from '@nestjs/testing';
import { RouteStatusesService } from './route-statuses.service';

describe('RoutesStatusesService', () => {
  let service: RouteStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouteStatusesService],
    }).compile();

    service = module.get<RouteStatusesService>(RouteStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
