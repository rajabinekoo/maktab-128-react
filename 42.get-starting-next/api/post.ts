export async function fetchPosts() {
  await wait(3000);
  const response = await fetch("https://dummyjson.com/posts");
  if (!response.ok) throw new Error("Faild to fetch posts");
  const data: IPostsList = await response.json();
  return data;
}

export async function fetchPostById(id: number | string) {
  await wait(3000);
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!response.ok) return undefined;
  const data: IPost = await response.json();
  return data;
}

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}
