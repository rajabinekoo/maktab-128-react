import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  HttpStatus,
  Injectable,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import Decimal from 'decimal.js';
import * as moment from 'moment';
import { DataSource, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { Transaction } from 'libs/entities';
import { CustomersService } from 'src/customers/customers.service';
import {
  ledgerSort,
  IListResponse,
  IDatabaseTxError,
  AddNewTransactionDto,
  IGetCustomerLedgerParams,
} from 'libs/dtos';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly customerService: CustomersService,
  ) {}

  public async getCustomerLedger(
    params?: IGetCustomerLedgerParams,
  ): Promise<IListResponse<Transaction>> {
    let order = ledgerSort['DESC_DATE'];
    if (params?.sort && ledgerSort[params.sort])
      order = ledgerSort[params.sort];

    const page = Number(params?.page || 1);
    const limit = Number(params?.limit || 10);
    const where: FindOptionsWhere<Transaction> = {};
    const search = params?.search?.trim?.()?.toLowerCase?.();
    const hasCid = params?.cid && params.cid > 0;

    if (hasCid) where.customer = { id: params.cid };
    if (search) where.description = ILike(`%${search}%`);

    const [list, count] = await Promise.all([
      await this.transactionRepository.find({
        where,
        take: limit,
        order: order,
        skip: page * limit - limit,
      }),
      await this.transactionRepository.count({ where }),
    ]);
    return { list, total: count, totalPages: Math.ceil(count / limit) };
  }

  public async addTransaction(data: AddNewTransactionDto) {
    if (data.credit > 0 && data.debit > 0)
      throw new BadRequestException(
        'In a single transaction, debit and credit amounts cannot both be greater than zero simultaneously.',
      );

    if (data.credit === 0 && data.debit === 0)
      throw new BadRequestException(
        'Either debit or credit amount must be greater than zero.',
      );

    if (moment(data.date).isAfter(moment())) {
      throw new BadRequestException('Date must be less than now.');
    }

    const customer = await this.customerService.getCustomerById(
      data.customerId,
    );
    if (!customer) throw new NotFoundException('Customer not found');

    const debit = new Decimal(data.debit);
    const credit = new Decimal(data.credit);
    const balance = new Decimal(customer.balance);
    const newBalance = balance.plus(credit).minus(debit);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const error: IDatabaseTxError = {};

    try {
      await this.customerService.setCustomerBalance(
        customer.id,
        newBalance.toNumber(),
        queryRunner,
      );
      await queryRunner.manager.save(
        new Transaction({
          customer,
          date: data.date,
          debit: data.debit,
          credit: data.credit,
          description: data.description,
        }),
      );
      await queryRunner.commitTransaction();
    } catch {
      error.msg = 'Something went wrong';
      error.status = HttpStatus.INTERNAL_SERVER_ERROR;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error.msg && error.status)
      throw new HttpException(error.msg, error.status);
  }

  public async removeTransaction(txId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: txId },
      relations: { customer: true },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');

    const debit = new Decimal(transaction.debit);
    const credit = new Decimal(transaction.credit);
    const balance = new Decimal(transaction.customer.balance);
    const newBalance = balance.minus(credit).plus(debit);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const error: IDatabaseTxError = {};

    try {
      await this.customerService.setCustomerBalance(
        transaction.customer.id,
        newBalance.toNumber(),
        queryRunner,
      );
      await queryRunner.manager.remove(transaction);
      await queryRunner.commitTransaction();
    } catch {
      error.msg = 'Something went wrong';
      error.status = HttpStatus.INTERNAL_SERVER_ERROR;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error.msg && error.status)
      throw new HttpException(error.msg, error.status);
  }
}
