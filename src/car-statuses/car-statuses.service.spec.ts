import { Test, TestingModule } from '@nestjs/testing';
import { CarsStatusesService } from './car-statuses.service';

describe('CarsStatusesService', () => {
  let service: CarsStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsStatusesService],
    }).compile();

    service = module.get<CarsStatusesService>(CarsStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
