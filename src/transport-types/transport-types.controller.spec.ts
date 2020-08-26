import { Test, TestingModule } from '@nestjs/testing';
import { TransportTypesController } from './transport-types.controller';

describe('TransportTypesController', () => {
  let controller: TransportTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportTypesController],
    }).compile();

    controller = module.get<TransportTypesController>(TransportTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
