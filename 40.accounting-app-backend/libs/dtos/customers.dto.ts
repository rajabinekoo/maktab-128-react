import { ApiProperty } from '@nestjs/swagger';

import {
  Length,
  IsEmail,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

import { IPagination } from './global.dto';

export interface IGetCustomersListParams extends Partial<IPagination> {
  search?: string;
}

export interface ICheckDuplicationDto {
  name: string;
  email: string;
  exceptId?: number;
}

export class AddNewCustomerDto {
  @ApiProperty({ default: '' })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: '' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: string;
}

export class UpdateCustomerDto {
  @ApiProperty({ default: '', required: false })
  @IsString()
  @Length(3)
  @IsOptional()
  name: string;

  @ApiProperty({ default: '', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  file?: string;
}
