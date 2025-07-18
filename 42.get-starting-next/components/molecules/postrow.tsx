"use client";

import { useRouter } from "next/navigation";

export const PostRow: React.FC<IPost & { link?: string }> = ({
  title,
  body,
  link,
}) => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => (link ? push(link) : undefined)}
      className="w-full p-5 border border-gray-200 rounded-lg space-y-3"
    >
      <p className="font-semibold text-lg">{title}</p>
      <p className="text-sm">{body}</p>
    </div>
  );
};

export const PostRowSkeleton: React.FC = () => {
  return (
    <div className="w-full p-5 border border-gray-200 rounded-lg space-y-3">
      <div className="bg-gray-300 animate-pulse w-full max-w-[300px] h-6 rounded-lg"></div>
      <div className="bg-gray-300 animate-pulse w-full max-w-[100px] h-3 rounded-lg"></div>
      <div className="bg-gray-300 animate-pulse w-full max-w-[200px] h-3 rounded-lg"></div>
      <div className="bg-gray-300 animate-pulse w-full max-w-[300px] h-3 rounded-lg"></div>
      <div className="bg-gray-300 animate-pulse w-full max-w-[400px] h-3 rounded-lg"></div>
    </div>
  );
};
