import Form from "next/form";

import { revalidatePath, revalidateTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

// export const dynamic = "force-dynamic";

// async function revalidateRandomNumber(tag: string) {
//   "use server";
//   revalidateTag(tag);
// }

async function revalidateRandomNumberPath() {
  "use server";
  revalidatePath("/");
}

async function getRandomNumber() {
  // "use cache";
  // cacheTag("randomNumber");
  await new Promise((r) => setTimeout(r, 1000));
  return { randomNumber: Math.random() };
}

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: Promise<{ search: string }>;
// }) {
//   const { search } = await searchParams;
//   const { randomNumber } = await getRandomNumber();
//   return (
//     <>
//       <Form action="">
//         <input
//           defaultValue={search}
//           type="text"
//           name="search"
//           placeholder="search"
//         />
//         <button type="submit">Search</button>
//       </Form>
//       <p>{randomNumber}</p>
//     </>
//   );
// }

// export default async function Home() {
//   const { randomNumber } = await getRandomNumber();
//   console.log(randomNumber);

//   return (
//     <>
//       <p>{randomNumber}</p>
//       <Form action={revalidateRandomNumber.bind({}, "randomNumber")}>
//         <button type="submit">revalidate</button>
//       </Form>
//     </>
//   );
// }

// export default async function Home() {
//   const { randomNumber } = await getRandomNumber();
//   console.log(randomNumber);

//   return (
//     <>
//       <p>{randomNumber}</p>
//       <Form action={revalidateRandomNumberPath}>
//         <button type="submit">revalidate</button>
//       </Form>
//     </>
//   );
// }

export default async function Home() {
  const { randomNumber } = await getRandomNumber();
  console.log(randomNumber);

  return (
    <>
      <p>{randomNumber}</p>
    </>
  );
}
