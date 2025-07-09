import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  constructor(data: Omit<Partial<Customer>, 'id'>) {
    Object.assign(this, data);
  }
}
