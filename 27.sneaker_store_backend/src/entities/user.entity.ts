import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sneakers } from './sneakers.entity';
import { Session } from './session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Sneakers, (wallet) => wallet.user, {
    cascade: true,
  })
  cart: Sneakers[];

  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
  })
  sessions: Session[];
}
