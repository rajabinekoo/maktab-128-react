import { Entity, Column, OneToMany } from 'typeorm';

import { Transaction } from './tranaction.entity';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Customer extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transactions: Transaction[];

  constructor(entity: Partial<Customer>) {
    super();
    Object.assign(this, entity);
  }
}
