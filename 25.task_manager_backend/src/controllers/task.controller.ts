import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Controller('task')
@ApiTags('task')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllUserTasks(@CurrentUser() user: User) {
    return user.tasks;
  }

  @Post()
  createNewTask(@CurrentUser() user: User, @Body() data: CreateTaskDto) {
    return this.taskService.createTask(data, user);
  }

  @Delete(':id')
  removeTask(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.taskService.removeTask(id, user);
  }

  @Patch('done/:id')
  updateTaskAsCompleted(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.updateTaskAsCompleted(id, user);
  }

  @Patch('inprogress/:id')
  updateTaskAsIncompleted(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.updateTaskAsIncompleted(id, user);
  }
}
