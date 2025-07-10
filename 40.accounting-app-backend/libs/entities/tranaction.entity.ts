import { Entity, Column, ManyToOne } from 'typeorm';

import { Customer } from './customer.entity';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Transaction extends AbstractEntity {
  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  date: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  debit: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  credit: number;

  constructor(entity: Partial<Transaction>) {
    super();
    Object.assign(this, entity);
  }
}
