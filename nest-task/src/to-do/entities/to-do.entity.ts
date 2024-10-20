import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('to_do')
export class ToDoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'date_created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: Date;

    @Column({ name: 'is_done', default: 'false' })
    isDone: boolean;

    @Column({ name: 'date_updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateUpdated: Date;
}