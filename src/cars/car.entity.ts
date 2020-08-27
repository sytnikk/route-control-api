import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { TransportType } from '../transport-types/transport-type.entity';
import { CarStatus } from '../car-statuses/car-status.entity';

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    licensePlate: string;

    @Column()
    model: string;

    @OneToOne(type => TransportType)
    @JoinColumn()
    transportType: TransportType;

    @Column({ type: 'datetime' })
    purchaseDate: Date;

    @Column()
    mileage: number;

    @OneToOne(type => CarStatus)
    @JoinColumn()
    status: CarStatus;
}