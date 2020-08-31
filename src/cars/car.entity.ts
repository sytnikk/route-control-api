import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';

import { TransportType } from '../transport-types/transport-type.entity';
import { CarStatus } from '../car-statuses/car-status.entity';
import { CarDto } from './car.dto';
import {Route} from "../routes/route.entity";

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

    @Column({ type: 'date' })
    purchaseDate: Date;

    @Column()
    mileage: number;

    @OneToMany(type => Route, route => route.car)
    routes: Route[];

    @OneToOne(type => CarStatus)
    @JoinColumn({ name: 'carStatusId' })
    carStatus: CarStatus;

    @Column()
    carStatusId: number;

    constructor(partial: Partial<CarDto|Car>) {
        Object.assign(this, partial);
    }
}
