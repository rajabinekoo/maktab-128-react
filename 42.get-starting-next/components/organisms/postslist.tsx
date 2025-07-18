import { fetchPosts } from "@/api/post";
import { PostRow, PostRowSkeleton } from "../molecules/postrow";

export const PostsList: React.FC = async () => {
  const data = await fetchPosts();
  return (
    <section className="space-y-5">
      {data.posts.map((el) => (
        <PostRow key={el.id} link={`/posts/${el.id}`} {...el} />
      ))}
    </section>
  );
};

export const PostsListSkeleton: React.FC = () => {
  return (
    <section className="space-y-5">
      {[1, 2, 3, 4, 5, 6, 7].map((el) => (
        <PostRowSkeleton key={el} />
      ))}
    </section>
  );
};
