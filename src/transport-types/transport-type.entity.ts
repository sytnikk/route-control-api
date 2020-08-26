import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransportType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}