import { Test, TestingModule } from '@nestjs/testing';
import { RoutesStatusesService } from './routes-statuses.service';

describe('RoutesStatusesService', () => {
  let service: RoutesStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutesStatusesService],
    }).compile();

    service = module.get<RoutesStatusesService>(RoutesStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
