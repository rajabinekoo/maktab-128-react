import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { Session } from './session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Task, (wallet) => wallet.user, {
    cascade: true,
  })
  tasks: Task[];

  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
  })
  sessions: Session[];
}
