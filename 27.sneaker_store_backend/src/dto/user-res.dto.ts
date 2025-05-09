import { Exclude } from 'class-transformer';
import { Session } from 'src/entities/session.entity';
import { Sneakers } from 'src/entities/sneakers.entity';

export class UserResDto {
  id: number;
  username: string;
  cart: Sneakers[];
  sessions: Session[];
  @Exclude()
  password: string;
  constructor(partial: Partial<UserResDto>) {
    Object.assign(this, partial);
  }
}
