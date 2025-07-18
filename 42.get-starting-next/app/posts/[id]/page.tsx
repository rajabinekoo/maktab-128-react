import { notFound } from "next/navigation";

import { fetchPostById } from "@/api/post";
import { PostRow } from "@/components/molecules/postrow";

const PostDetail: React.FC<{ params: Promise<{ id: string }> }> = async ({
  params,
}) => {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) return notFound();
  const post = await fetchPostById(id);
  if (!post) return notFound();
  return <PostRow {...post} />;
};

export default PostDetail;
