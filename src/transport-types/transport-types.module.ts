import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransportType } from './transport-type.entity';
import { TransportTypesController } from './transport-types.controller';
import { TransportTypesService } from './transport-types.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TransportType]),
    ],
    controllers: [TransportTypesController],
    providers: [TransportTypesService],
    exports: [TransportTypesService, TypeOrmModule],
})
export class TransportTypesModule {}
