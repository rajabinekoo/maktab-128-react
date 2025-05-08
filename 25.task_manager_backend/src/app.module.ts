import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { Task } from './entities/task.entity';
import { TaskController } from './controllers/task.controller';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionExpirationTaskService } from './schedulers/session-expiration.task';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Session, Task]),
    ScheduleModule.forRoot(),
  ],
  controllers: [TaskController, AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    TaskService,
    SessionExpirationTaskService,
  ],
})
export class AppModule {}
