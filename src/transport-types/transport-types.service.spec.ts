import { Test, TestingModule } from '@nestjs/testing';
import { TransportTypesService } from './transport-types.service';

describe('TransportTypesService', () => {
  let service: TransportTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportTypesService],
    }).compile();

    service = module.get<TransportTypesService>(TransportTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
