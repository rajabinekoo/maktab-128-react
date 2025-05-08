import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/services/user.service';
import { UserResDto } from 'src/dto/user-res.dto';
import { ISignupLogin } from 'src/interfaces/signup-login.interface';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<ISignupLogin> {
    const user = await this.userService.createNewUser(body);
    const token = await this.authService.createNewSession(user);
    return {
      user: new UserResDto(user),
      token,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<ISignupLogin> {
    const user = await this.userService.getUserByCrendentials(body);
    const token = await this.authService.createNewSession(user);
    return {
      user: new UserResDto(user),
      token,
    };
  }
}
