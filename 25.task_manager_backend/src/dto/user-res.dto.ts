import { Exclude } from 'class-transformer';
import { Session } from 'src/entities/session.entity';
import { Task } from 'src/entities/task.entity';

export class UserResDto {
  id: number;
  username: string;
  tasks: Task[];
  sessions: Session[];
  @Exclude()
  password: string;
  constructor(partial: Partial<UserResDto>) {
    Object.assign(this, partial);
  }
}
