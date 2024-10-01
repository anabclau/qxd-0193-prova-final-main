import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: 0 })
    progress!: number;

    @Column()
    description!: string;

    @ManyToOne(() => User, user => user.projects)
    user!: User;
}

