import { NextRequest } from "next/server";

export function parseSearchParams(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let page = Number(searchParams.get("page")?.trim?.() || 1);
  let limit = Number(searchParams.get("limit")?.trim?.() || 10);
  const search = searchParams.get("search")?.trim?.() || undefined;
  if (isNaN(page)) page = 1;
  if (isNaN(limit)) limit = 1;
  return <IGetListParams>{ page, limit, search };
}
