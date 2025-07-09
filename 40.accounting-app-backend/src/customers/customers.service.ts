import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, ILike, Not, Repository } from 'typeorm';

import { Customer } from 'libs/entities';
import {
  AddNewCustomerDto,
  UpdateCustomerDto,
  ICheckDuplicationDto,
  IGetCustomersListParams,
} from 'libs/dtos';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepostory: Repository<Customer>,
  ) {}

  public async getCustomerById(id: number) {
    return this.customerRepostory.findOneBy({ id });
  }

  public async getCustomerByData(data: ICheckDuplicationDto) {
    return await this.customerRepostory.findOneBy([
      {
        name: data.name.toLowerCase(),
        id: data.exceptId ? Not(data.exceptId) : undefined,
      },
      {
        email: data.email.toLowerCase(),
        id: data.exceptId ? Not(data.exceptId) : undefined,
      },
    ]);
  }

  public async getCustomers(params?: IGetCustomersListParams) {
    const page = Number(params?.page || 1);
    const limit = Number(params?.limit || 10);
    const where: FindOptionsWhere<Customer>[] = [];
    const search = params?.search?.trim?.()?.toLowerCase?.();
    if (search) {
      where.push({ name: ILike(`%${search}%`) });
      where.push({ email: ILike(`%${search}%`) });
    }
    const [list, count] = await Promise.all([
      await this.customerRepostory.find({
        where,
        take: limit,
        order: { id: 'DESC' },
        skip: page * limit - limit,
      }),
      await this.customerRepostory.count({ where }),
    ]);
    return { list, total: count, totalPages: Math.ceil(count / limit) };
  }

  public async addNewCustomer(data: AddNewCustomerDto) {
    return this.customerRepostory.save(
      new Customer({
        avatar: data.file,
        name: data.name.toLowerCase(),
        email: data.email.toLowerCase(),
      }),
    );
  }

  public async deleteCustomer(customer: Customer) {
    await this.customerRepostory.remove(customer);
  }

  public async updateCustomer(target: Customer, data: UpdateCustomerDto) {
    await this.customerRepostory.update(
      { id: target.id },
      new Customer({
        avatar: data.file || undefined,
        name: data.name?.toLowerCase?.() || undefined,
        email: data.email?.toLowerCase?.() || undefined,
      }),
    );
  }
}
