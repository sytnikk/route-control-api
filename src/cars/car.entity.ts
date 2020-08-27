import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { TransportType } from '../transport-types/transport-type.entity';
import { CarStatus } from '../car-statuses/car-status.entity';
import { CarDto } from './car.dto';

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    licensePlate: string;

    @Column()
    model: string;

    @OneToOne(type => TransportType)
    @JoinColumn({ name: 'transportTypeId' })
    transportType: TransportType;

    @Column()
    transportTypeId: number;

    @Column({ type: 'datetime' })
    purchaseDate: Date;

    @Column()
    mileage: number;

    @OneToOne(type => CarStatus)
    @JoinColumn({ name: 'carStatusId' })
    carStatus: CarStatus;

    @Column()
    carStatusId: number;

    constructor(partial: Partial<CarDto>) {
        Object.assign(this, partial);
    }
}