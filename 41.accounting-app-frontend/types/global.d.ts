type id = number | `${number}`;

interface IChildren {
  children: React.ReactNode;
}

interface IListResponse<T> {
  total: number;
  totalPages: number;
  list: Array<T>;
}
