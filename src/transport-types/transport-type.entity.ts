import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class TransportType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}