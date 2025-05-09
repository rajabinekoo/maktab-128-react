import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { LoginDto } from 'src/dto/login.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
import { Sneakers } from 'src/entities/sneakers.entity';
import { Session } from 'src/entities/session.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(User)
    private sneakersRepository: Repository<Sneakers>,
    @InjectRepository(User)
    private sessionsRepository: Repository<Session>,
  ) {}

  async createNewUser(data: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    if (!!user) {
      throw new BadRequestException('User already exist');
    }
    data.password = bcrypt.hashSync(data.password);
    return this.usersRepository.save(data);
  }

  async getUserByCrendentials(data: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { username: data.username },
      relations: { cart: true, sessions: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserInfo(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: { cart: true, sessions: true },
    });
  }

  async deleteAccount(user: User) {
    await this.usersRepository.remove(user);
  }

  async updateUser(id: number, data: Partial<UpdateProfileDto>) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const duplicatedUser = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    if (!!duplicatedUser && id !== duplicatedUser?.id) {
      throw new ConflictException('User already exist with this username');
    }
    return this.usersRepository.update(
      { id },
      { ...data, password: bcrypt.hashSync(data.password) },
    );
  }
}
