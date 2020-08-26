import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CarStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}