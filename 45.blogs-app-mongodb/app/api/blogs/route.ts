import { NextRequest } from "next/server";

import { blogService } from "@/server/service/blog.service";
import { mongoConnection } from "@/libs/database/connection";
import { parseSearchParams } from "@/libs/helpers/list-params";

export async function GET(request: NextRequest) {
  await mongoConnection.init();
  const data = parseSearchParams(request);
  return blogService.getBlogsList(data);
}

export async function POST(request: Request) {
  await mongoConnection.init();
  const body: IAddBlog = await request.json();
  return blogService.addNewBlog(body);
}
