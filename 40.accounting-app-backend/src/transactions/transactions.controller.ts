import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';

import { TransactionService } from './transactions.service';
import { AddNewTransactionDto, ledgerSort, txSort } from 'libs/dtos';

const ledgerSortKeys = Object.keys(ledgerSort);

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('ledger')
  @ApiQuery({ name: 'cid', type: Number, required: false })
  @ApiQuery({ name: 'page', type: String, required: false })
  @ApiQuery({ name: 'limit', type: String, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'sort', enum: ledgerSortKeys, required: false })
  public async customersLedger(
    @Query('search') search?: string,
    @Query('cid', new ParseIntPipe({ optional: true })) cid?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('sort', new ParseEnumPipe(ledgerSortKeys, { optional: true }))
    sort?: txSort,
  ) {
    return this.transactionService.getCustomerLedger({
      cid,
      page,
      sort,
      limit,
      search,
    });
  }

  @Post()
  public async addTx(@Body() body: AddNewTransactionDto) {
    await this.transactionService.addTransaction(body);
  }

  @Delete(':txId')
  public async removeTx(@Param('txId', ParseIntPipe) txId: number) {
    await this.transactionService.removeTransaction(txId);
  }
}
