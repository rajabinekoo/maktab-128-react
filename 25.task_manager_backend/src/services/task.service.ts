import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  private async findUserTask(id: number, user: User) {
    const targetTask = await this.tasksRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!targetTask || targetTask?.user?.id !== user.id) {
      throw new NotFoundException('Task not found');
    }
    return targetTask;
  }

  async createTask(data: CreateTaskDto, user: User) {
    return this.tasksRepository.save({ ...data, user });
  }

  async removeTask(id: number, user: User) {
    const task = await this.findUserTask(id, user);
    await this.tasksRepository.remove(task);
  }

  async updateTaskAsCompleted(id: number, user: User) {
    await this.findUserTask(id, user);
    await this.tasksRepository.update({ id }, { isCompleted: true });
  }

  async updateTaskAsIncompleted(id: number, user: User) {
    await this.findUserTask(id, user);
    await this.tasksRepository.update({ id }, { isCompleted: false });
  }
}
