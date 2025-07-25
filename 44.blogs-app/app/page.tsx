import { BlogCard } from "./components/blog-card";
import { Blog } from "@/server/entity/blog.entity";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-cache",
    next: { tags: ["fetch-blogs"] },
  });
  const result: IListRes<Blog> = await response.json();

  return (
    <main className="container mx-auto max-w-[600px]">
      <section className="space-y-4 py-10">
        <p className="text-2xl font-semibold">Blogs</p>
        {result.list.map((el) => (
          <BlogCard key={el.id} {...el} />
        ))}
      </section>
    </main>
  );
}
