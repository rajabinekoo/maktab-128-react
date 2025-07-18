import Link from "next/link";

export const NavBar: React.FC = () => {
  return (
    <div className="w-screen px-5 h-[50px] flex items-center gap-x-4">
      <Link href="/posts">
        <p>Posts</p>
      </Link>
      <Link href="/contact">
        <p>Contact</p>
      </Link>
      <Link href="/about">
        <p>About</p>
      </Link>
    </div>
  );
};
