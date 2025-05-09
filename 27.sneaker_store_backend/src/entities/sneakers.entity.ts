import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Sneakers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'int' })
  pid: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  imageURL: string;

  @Column({ nullable: false })
  colors: string;

  @Column({ nullable: false })
  sizes: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  brand: string;

  @ManyToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
