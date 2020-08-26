import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RouteStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}