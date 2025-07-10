import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { FindOptionsOrder } from 'typeorm';
import {
  Min,
  IsInt,
  IsDate,
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { IPagination } from './global.dto';
import { Transaction } from 'libs/entities';

export type txSort =
  | 'ASC_DATE'
  | 'DESC_DATE'
  | 'ASC_DEBIT'
  | 'DESC_DEBIT'
  | 'ASC_CREDIT'
  | 'DESC_CREDIT';

export const ledgerSort: Record<txSort, FindOptionsOrder<Transaction>> = {
  ASC_DATE: { date: 1 },
  DESC_DATE: { date: -1 },
  ASC_DEBIT: { debit: 1 },
  DESC_DEBIT: { debit: -1 },
  ASC_CREDIT: { credit: 1 },
  DESC_CREDIT: { credit: -1 },
};

export interface IGetCustomerLedgerParams extends Partial<IPagination> {
  search?: string; // for description
  sort?: txSort;
  cid?: number;
}

export class AddNewTransactionDto {
  @ApiProperty({ default: '' })
  @IsOptional()
  @IsString()
  @Length(3)
  description: string;

  @ApiProperty({ type: 'number', default: 0 })
  @IsNotEmpty()
  debit: number;

  @ApiProperty({ type: 'number', default: 0 })
  @IsNotEmpty()
  credit: number;

  @ApiProperty({ type: 'integer', default: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  customerId: number;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2025-07-10T12:34:56Z',
  })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
