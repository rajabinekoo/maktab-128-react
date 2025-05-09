import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Sneakers } from 'src/entities/sneakers.entity';
import {
  IGetSneakers,
  IGetSneakersResult,
} from 'src/interfaces/get-sneakers.interface';
import { defaultSneakers } from 'src/app.constants';

@Injectable()
export class SneakerService {
  constructor(
    @InjectRepository(Sneakers)
    private sneakersRepository: Repository<Sneakers>,
  ) {
    this.init().catch();
  }

  private async init() {
    for (const s of defaultSneakers) {
      const targetSneaker = await this.sneakersRepository.findOne({
        where: { pid: s.pid },
      });
      if (!!targetSneaker) continue;
      await this.sneakersRepository.save({
        pid: s.pid,
        name: s.name,
        imageURL: s.imageURL,
        colors: s.colors.join('|'),
        sizes: s.sizes.join('|'),
        price: Number(s.price),
        category: s.category,
        gender: s.gender,
        brand: s.brand,
      });
    }
  }

  async getAllSneakers(q: IGetSneakers): Promise<IGetSneakersResult> {
    const queries: FindManyOptions<Sneakers> = {};
    queries.take = q.limit;
    queries.skip = q.limit * q.page - q.limit;
    if (!!q.brands?.length) {
      if (!queries.where) queries.where = [];
      if (queries.where instanceof Array)
        for (const b of q.brands) {
          queries.where.push({ brand: b });
        }
    }
    if (!!q.search) {
      if (queries.where instanceof Array) {
        for (const wq of queries.where) {
          wq.name = ILike(`%${q.search}%`);
        }
      } else if (!!queries.where) {
        queries.where.name = ILike(`%${q.search}%`);
      } else {
        queries.where = { name: ILike(`%${q.search}%`) };
      }
    }
    // if (!!q.categories?.length) {
    //   queries.where = [];
    //   for (const c of q.categories) {
    //     queries.where.push({ category: c });
    //   }
    // }
    // if (!!q.genders?.length) {
    //   if (!queries.where) queries.where = [];
    //   if (queries.where instanceof Array)
    //     for (const g of q.genders) {
    //       queries.where.push({ gender: g });
    //     }
    // }
    // if (!!q.colors?.length) {
    //   if (!queries.where) queries.where = [];
    //   if (queries.where instanceof Array)
    //     for (const c of q.colors) {
    //       queries.where.push({ colors: ILike(`%${c}%`) });
    //     }
    // }
    // if (!!q.sizes?.length) {
    //   if (!queries.where) queries.where = [];
    //   if (queries.where instanceof Array)
    //     for (const s of q.sizes) {
    //       queries.where.push({ sizes: ILike(`%${s}%`) });
    //     }
    // }
    const result = await this.sneakersRepository.findAndCount(queries);
    return {
      total: result[1],
      totalPages: Math.ceil(result[1] / q.limit),
      page: q.page,
      perPage: q.limit,
      data: result[0],
    };
  }

  async findOneById(id: number) {
    const result = await this.sneakersRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException('Sneaker not found');
    }
    return result;
  }

  async getCategories() {
    return [
      ...new Set(
        (await this.sneakersRepository.find()).map((el) => el.category),
      ),
    ];
  }

  async getBrands() {
    return [
      ...new Set((await this.sneakersRepository.find()).map((el) => el.brand)),
    ];
  }

  async getGenders() {
    return [
      ...new Set((await this.sneakersRepository.find()).map((el) => el.gender)),
    ];
  }
}
