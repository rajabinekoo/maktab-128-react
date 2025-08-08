interface IListResponse {
  total: number;
  limit: number;
  skip: number;
}

interface IChildren {
  children: ReactNode | Array<ReactNode>;
}

interface IParams<T> {
  params: Promise<T>;
}

interface ISearchParams<T> {
  searchParams: Promise<T>;
}
