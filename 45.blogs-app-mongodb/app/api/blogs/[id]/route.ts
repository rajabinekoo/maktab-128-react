import { blogService } from "@/server/service/blog.service";
import { mongoConnection } from "@/libs/database/connection";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await mongoConnection.init();
  const id = (await params).id;
  const body: IUpdateBlog = await request.json();
  return blogService.updateBlog(id, body);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await mongoConnection.init();
  const id = (await params).id;
  return blogService.deleteBlog(id);
}
