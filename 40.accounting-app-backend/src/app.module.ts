import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from '../libs/entities';
import { StorageModule } from '@app/storage';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    StorageModule,
    CustomersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Customer],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
