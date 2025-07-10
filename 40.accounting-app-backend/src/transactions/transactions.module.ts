import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transaction } from 'libs/entities';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [CustomersModule, TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
