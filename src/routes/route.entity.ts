import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

import { TransportType } from '../transport-types/transport-type.entity';
import { RouteStatus } from '../route-statuses/route-status.entity';

@Entity()
export class Route {
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

    @OneToOne(type => RouteStatus)
    @JoinColumn()
    status: RouteStatus;
}