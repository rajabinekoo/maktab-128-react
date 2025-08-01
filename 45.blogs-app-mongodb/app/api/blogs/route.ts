import { headers } from "next/headers";
import { NextRequest } from "next/server";

import { Res } from "@/server/response";
import { blogService } from "@/server/service/blog.service";
import { mongoConnection } from "@/libs/database/connection";
import { parseSearchParams } from "@/libs/helpers/list-params";
import { authenticationJwt } from "@/libs/helpers/authentication-jwt";

export async function GET(request: NextRequest) {
  await mongoConnection.init();
  const data = parseSearchParams(request);
  return blogService.getBlogsList(data);
}

export async function POST(request: Request) {
  const headersList = await headers();
  const token = headersList.get("authorization");
  const authorized = authenticationJwt.checkSession(token);
  if (!authorized) return Res({ error: "Unauthorized" }, 403);
  // const authorized = authentication.checkSession(token);
  // if (!authorized) return Res({ error: "Unauthorized" }, 403);
  await mongoConnection.init();
  const body: IAddBlog = await request.json();
  return blogService.addNewBlog(body);
}
