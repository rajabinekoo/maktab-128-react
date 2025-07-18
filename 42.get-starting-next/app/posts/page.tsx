import { Suspense } from "react";
import { PostsList, PostsListSkeleton } from "@/components/organisms/postslist";

const PostsPage: React.FC = () => {
  return (
    <>
      <p className="mb-4 text-2xl font-semibold">Posts list</p>
      <Suspense fallback={<PostsListSkeleton />}>
        <PostsList />
      </Suspense>
    </>
  );
};

export default PostsPage;
