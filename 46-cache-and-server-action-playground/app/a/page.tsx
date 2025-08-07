import { Search } from "@/component/search";
import Link from "next/link";

export default function A() {
  return (
    <>
      <p>A page</p>
      <div>
        <Link href="/b">B page</Link>
      </div>
      <Search />
    </>
  );
}
