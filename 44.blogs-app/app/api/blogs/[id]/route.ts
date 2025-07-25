import { blogService } from "@/server/service/blog.service";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body: IUpdateBlog = await request.json();
  return blogService.updateBlog(id, body);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  return blogService.deleteBlog(id);
}
