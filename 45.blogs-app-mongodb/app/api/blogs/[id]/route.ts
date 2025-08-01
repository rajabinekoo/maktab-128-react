import { headers } from "next/headers";

import { Res } from "@/server/response";
import { blogService } from "@/server/service/blog.service";
import { mongoConnection } from "@/libs/database/connection";
import { authenticationJwt } from "@/libs/helpers/authentication-jwt";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const headersList = await headers();
  const token = headersList.get("authorization");
  // const authorized = authentication.checkSession(token);
  // if (!authorized) return Res({ error: "Unauthorized" }, 403);
  const authorized = authenticationJwt.checkSession(token);
  if (!authorized) return Res({ error: "Unauthorized" }, 403);
  await mongoConnection.init();
  const id = (await params).id;
  const body: IUpdateBlog = await request.json();
  return blogService.updateBlog(id, body);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const headersList = await headers();
  const token = headersList.get("authorization");
  // const authorized = authentication.checkSession(token);
  // if (!authorized) return Res({ error: "Unauthorized" }, 403);
  const authorized = authenticationJwt.checkSession(token);
  if (!authorized) return Res({ error: "Unauthorized" }, 403);
  await mongoConnection.init();
  const id = (await params).id;
  return blogService.deleteBlog(id);
}
