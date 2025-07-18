import Link from "next/link";

const PostDetailLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="space-y-4">
      <div>
        <Link href="/posts">
          <button className="border border-gray-200 rounded-lg px-3 py-2 cursor-pointer">
            Back
          </button>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default PostDetailLayout;
