import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AvatarContentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const extname = req.url.split('.').pop();

    if (extname === 'jpg' || extname === 'jpeg') {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (extname === 'png') {
      res.setHeader('Content-Type', 'image/png');
    }

    next();
  }
}
