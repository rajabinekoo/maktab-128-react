import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageModule } from '@app/storage';
import { Customer, Transaction } from '../libs/entities';
import { CustomersModule } from './customers/customers.module';
import { TransactionModule } from './transactions/transactions.module';

@Module({
  imports: [
    StorageModule,
    CustomersModule,
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Customer, Transaction],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
