import { Sneakers } from 'src/entities/sneakers.entity';

export interface IGetSneakers {
  page: number;
  limit: number;
  search: string;
  categories?: string[];
  brands?: string[];
  genders?: string[];
  sizes?: string[];
  colors?: string[];
}

export interface IGetSneakersResult {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Sneakers[];
}
