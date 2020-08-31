import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

import { TransportType } from '../transport-types/transport-type.entity';
import { RouteStatus } from '../route-statuses/route-status.entity';
import { Car } from '../cars/car.entity';
import { RouteDto } from './route.dto';

@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cityStart: string;

    @Column()
    cityEnd: string;

    @Column()
    distanceBetweenCities: number;

    @Column()
    revenue: number;

    @Column({ type: 'date' })
    sendingDate: Date;

    @OneToOne(type => TransportType)
    @JoinColumn({ name: 'transportTypeId' })
    transportType: TransportType;

    @Column()
    transportTypeId: number;

    @OneToOne(type => Car)
    @JoinColumn({ name: 'carId' })
    car: Car;

    @Column()
    carId: number|null;

    @OneToOne(type => RouteStatus, { cascade: [ "insert" ] })
    @JoinColumn({ name: 'routeStatusId' })
    routeStatus: RouteStatus;

    @Column()
    routeStatusId: number;

    @Column({ type: 'date' })
    deliveryDate: Date;

    constructor(partial: Partial<RouteDto|Route>) {
        Object.assign(this, partial);
    }
}
