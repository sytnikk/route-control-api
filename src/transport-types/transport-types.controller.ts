import { Controller, Get } from '@nestjs/common';

import { TransportType } from './transport-type.entity';
import { TransportTypesService } from './transport-types.service';

@Controller('transport-types')
export class TransportTypesController {
    constructor(private transportTypesService: TransportTypesService) {}

    @Get()
    index(): Promise<TransportType[]> {
        return this.transportTypesService.findAll();
    }
}
