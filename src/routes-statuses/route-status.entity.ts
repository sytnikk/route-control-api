import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class RouteStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}