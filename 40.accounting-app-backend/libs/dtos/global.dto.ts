import { HttpStatus } from '@nestjs/common';

export interface IPagination {
  page: number;
  limit: number;
}

export interface IDatabaseTxError {
  msg?: string;
  status?: HttpStatus;
}

export interface IListResponse<T> {
  list: Array<T>;
  total: number;
  totalPages: number;
}
