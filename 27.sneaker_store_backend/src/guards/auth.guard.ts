import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace?.('Bearer ', '');
    if (!token) return false;
    const session = await this.authService.findSession(token);
    if (!session) return false;
    request.res.locals.user = await this.userService.getUserInfo(
      session.user.id,
    );
    return true;
  }
}
