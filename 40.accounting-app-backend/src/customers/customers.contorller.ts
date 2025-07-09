import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Put,
  Body,
  Post,
  Query,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { StorageService } from '@app/storage';
import { CustomersService } from './customers.service';
import { AvatarValidationPipe } from 'libs/validators';
import { AddNewCustomerDto, UpdateCustomerDto } from 'libs/dtos';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly storageService: StorageService,
    private readonly customersService: CustomersService,
  ) {}

  @Get()
  @ApiQuery({ name: 'page', type: String, required: false })
  @ApiQuery({ name: 'limit', type: String, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  public async customersList(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.customersService.getCustomers({ page, limit, search });
  }

  @Post()
  @ApiBody({ type: AddNewCustomerDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  public async addNewCustomer(
    @Body() body: AddNewCustomerDto,
    @UploadedFiles(AvatarValidationPipe) avatar: Express.Multer.File | null,
  ) {
    if (!avatar) throw new NotFoundException('Avatar not found');
    const duplication = await this.customersService.getCustomerByData(body);
    if (duplication) throw new ConflictException('Already exist');
    body.file = await this.storageService.put(avatar.buffer, avatar.mimetype);
    return this.customersService.addNewCustomer(body);
  }

  @Put(':customerId')
  @ApiBody({ type: UpdateCustomerDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  public async updateCustomer(
    @Body() body: UpdateCustomerDto,
    @Param('customerId', ParseIntPipe) customerId: number,
    @UploadedFiles(AvatarValidationPipe) avatar: Express.Multer.File | null,
  ) {
    const customer = await this.customersService.getCustomerById(customerId);
    if (!customer) throw new NotFoundException('Customer not found');
    const duplication = await this.customersService.getCustomerByData({
      ...body,
      exceptId: customer.id,
    });
    const isSame =
      duplication?.name === customer.name &&
      duplication?.email === customer.email;
    if (duplication && (duplication.id !== customer.id || !isSame))
      throw new ConflictException(
        'Duplication in unique fields (name or email)',
      );
    if (avatar) {
      body.file = await this.storageService.put(avatar.buffer, avatar.mimetype);
      await this.storageService.delete(customer.avatar);
    }
    return this.customersService.updateCustomer(customer, body);
  }

  @Delete(':customerId')
  public async removeCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    const customer = await this.customersService.getCustomerById(customerId);
    if (!customer) throw new NotFoundException('Customer not found');
    await this.customersService.deleteCustomer(customer);
  }
}
