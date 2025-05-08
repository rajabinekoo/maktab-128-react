import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { Session } from 'src/entities/session.entity';
import { User } from 'src/entities/user.entity';
import { fetchTtl } from 'src/utils/fetchTTL';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async createNewSession(user: User) {
    const session = await this.sessionsRepository.save({
      user,
      token: uuid(),
      expiration: fetchTtl(),
    });
    return session.token;
  }

  async findSession(token: string) {
    const session = await this.sessionsRepository.findOne({
      where: { token },
      relations: { user: true },
    });
    if (!session) {
      throw new ForbiddenException('Forbidden resource');
    }
    const now = moment().unix();
    if (now >= session.expiration) {
      await this.sessionsRepository.remove(session);
      return undefined;
    }
    return session;
  }

  async removeSession(id: number) {
    const session = await this.sessionsRepository.findOne({
      where: { id },
    });
    if (!!session) await this.sessionsRepository.remove(session);
  }
}
