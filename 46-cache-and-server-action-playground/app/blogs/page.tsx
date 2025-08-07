import { reinvalidateRandomNumber } from "@/server-actions/random-number";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Form from "next/form";

async function getRandomNumber() {
  "use cache";
  cacheTag("randomNumber");
  await new Promise((r) => setTimeout(r, 1000));
  return { randomNumber: Math.random() };
}

export default async function Home() {
  const { randomNumber } = await getRandomNumber();
  console.log(randomNumber);

  return (
    <>
      <p>{randomNumber}</p>
      <Form action={reinvalidateRandomNumber}>
        <button type="submit">revalidate</button>
      </Form>
    </>
  );
}
