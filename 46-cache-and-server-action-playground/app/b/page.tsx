import Link from "next/link";

export default function B() {
  return (
    <>
      <p>B page</p>
      <div>
        <Link href="/a">A page</Link>
      </div>
    </>
  );
}
