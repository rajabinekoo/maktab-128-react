import { useEffect, useState } from "react";
import { getAllPosts } from "../apis/posts";
import { getUserById } from "../apis/users";
import { PostCard } from "./ui/molecules/post-card";

function App() {
  const [list, setList] = useState<IPostView[]>([]);

  const getData = async () => {
    try {
      const postsResult = await getAllPosts();
      const users = await Promise.all(
        postsResult.posts.map((el) => getUserById(el.userId))
      );
      const l: Array<IPostView> = [];
      const usersDict: Record<number, IUser> = {};
      for (const u of users) usersDict[u.id] = u;
      for (const p of postsResult.posts) {
        const user = usersDict[p.userId];
        l.push({ ...p, user });
      }
      setList(l);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <main className="bg-slate-300 w-screen min-h-screen h-full py-[30px]">
      <section className="container px-2 mx-auto space-y-5">
        {list.length === 0 && <p>Loading...</p>}
        {list.map((el) => (
          <PostCard key={el.id} {...el} />
        ))}
      </section>
    </main>
  );
}

export default App;
