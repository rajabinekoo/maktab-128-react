type id = string | number;

type listParamsDto = {
  page: number;
  limit: number;
};

type listResDto = {
  page: number;
  total: number;
  perPage: number;
  totalPages: number;
};
