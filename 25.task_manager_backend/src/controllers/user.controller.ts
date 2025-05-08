import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { UserResDto } from 'src/dto/user-res.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getInfo(@CurrentUser() user: User) {
    return new UserResDto(user);
  }

  @Put()
  updateProfile(@CurrentUser() user: User, @Body() body: UpdateProfileDto) {
    return this.userService.updateUser(user.id, body);
  }

  @Delete()
  deletaAccount(@CurrentUser() user: User) {
    return this.userService.deleteAccount(user);
  }
}
