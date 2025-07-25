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
  InternalServerErrorException,
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

  @Get(':cid')
  public async customerInfo(@Param('cid', ParseIntPipe) cid: number) {
    const c = await this.customersService.getCustomerById(cid);
    if (!c) throw new NotFoundException('Customer not found');
    return c;
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
    try {
      return await this.customersService.addNewCustomer(body);
    } catch (e) {
      console.error(e);
      await this.storageService.delete(body.file);
      throw new InternalServerErrorException('Something went wrong');
    }
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
    }
    try {
      const oldAvatar = customer.avatar;
      if (body.file === 'undefined') body.file = undefined;
      const result = await this.customersService.updateCustomer(customer, body);
      if (avatar) await this.storageService.delete(oldAvatar);
      return result;
    } catch {
      if (body.file) await this.storageService.delete(body.file);
      throw new InternalServerErrorException('Something went wrong');
    }
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
