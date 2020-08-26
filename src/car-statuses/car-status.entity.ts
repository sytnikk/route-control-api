import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}