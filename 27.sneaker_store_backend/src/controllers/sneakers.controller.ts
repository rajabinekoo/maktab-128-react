import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { SneakerService } from '../services/sneakers.service';
import { IGetSneakersResult } from 'src/interfaces/get-sneakers.interface';

@Controller('sneaker')
@ApiTags('sneaker')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    example: 1,
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    example: 10,
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    allowEmptyValue: true,
    required: false,
  })
  // @ApiQuery({
  //   name: 'categories',
  //   type: Array<string>,
  //   allowEmptyValue: true,
  //   required: false,
  //   isArray: true,
  // })
  @ApiQuery({
    name: 'brands',
    type: Array<string>,
    allowEmptyValue: true,
    required: false,
    isArray: true,
  })
  // @ApiQuery({
  //   name: 'genders',
  //   type: Array<string>,
  //   allowEmptyValue: true,
  //   required: false,
  //   isArray: true,
  // })
  getAllSneakers(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('search') search?: string,
    @Query('brands') brands?: string[] | string,
    // @Query('categories') categories?: string[] | string,
    // @Query('genders') genders?: string[] | string,
  ): Promise<IGetSneakersResult> {
    return this.sneakerService.getAllSneakers({
      page: page || 1,
      limit: limit || 10,
      search,
      brands:
        brands instanceof Array ? brands : !!brands ? [brands] : undefined,
    });
  }

  @Get('item/:id')
  getSneakerById(@Param('id', ParseIntPipe) id: number) {
    return this.sneakerService.findOneById(id);
  }

  @Get('brands')
  getBrands() {
    return this.sneakerService.getBrands();
  }

  // @Get('categories')
  // getCategories() {
  //   return this.sneakerService.getCategories();
  // }

  // @Get('genders')
  // getGenders() {
  //   return this.sneakerService.getGenders();
  // }
}
