import { NextRequest } from "next/server";
import { blogService } from "@/server/service/blog.service";
import { parseSearchParams } from "@/libs/helpers/list-params";

export async function GET(request: NextRequest) {
  const data = parseSearchParams(request);
  return blogService.getBlogsList(data);
}

export async function POST(request: Request) {
  const body: IAddBlog = await request.json();
  return blogService.addNewBlog(body);
}
