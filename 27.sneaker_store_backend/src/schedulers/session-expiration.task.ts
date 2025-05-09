import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Session } from 'src/entities/session.entity';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SessionExpirationTaskService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async sessionExpirationChecker() {
    const now = moment().unix();
    const sessions = await this.sessionsRepository.find({
      where: { expiration: LessThanOrEqual(now) },
    });
    if (!Array.isArray(sessions)) return;
    for (const s of sessions) {
      await this.sessionsRepository.remove(s);
    }
  }
}
