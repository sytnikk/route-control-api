import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

import { TransportType } from '../transport-types/transport-type.entity';
import { RouteStatus } from '../route-statuses/route-status.entity';
import { Car } from '../cars/car.entity';

@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startCity: string;

    @Column()
    endCity: string;

    @Column()
    distanceBetweenCities: number;

    @Column({ type: 'datetime' })
    sendingDate: Date;

    @OneToOne(type => TransportType)
    @JoinColumn()
    transportType: TransportType;

    @OneToOne(type => Car)
    @JoinColumn()
    car: Car;

    @OneToOne(type => RouteStatus)
    @JoinColumn()
    status: RouteStatus;

    @Column({ type: 'datetime' })
    deliveryDate: Date;
}