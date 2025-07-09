import { ServeStaticModule } from '@nestjs/serve-static';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { storagePath } from './storage.constants';
import { StorageService } from './storage.service';
import { AvatarContentMiddleware } from 'libs/middlewares';

@Global()
@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: storagePath })],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AvatarContentMiddleware).forRoutes('images/');
  }
}
