type getSneakersListReqDto = {
  search?: string;
  brands?: Array<string>;
} & listParamsDto;
type getSneakersList = (
  params: getSneakersListReqDto
) => Promise<listResDto & { data: Array<sneakerEntity> }>;
