interface IGetListParams {
  page: number;
  limit: number;
  search?: string;
}

interface IListRes<T> {
  page: number;
  limit: number;
  count: number;
  pageCount: number;
  list: Array<T>;
}
