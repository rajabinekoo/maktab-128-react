"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export const BlogCard: React.FC<IBlog> = ({ body, _id, name }) => {
  const { refresh } = useRouter();
  const deleteBlog = async () => {
    try {
      await axios.delete(`/api/blogs/${_id}`);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
      <div>
        <p className="font-semibold text-lg text-gray-700">{name}</p>
        <p className="text-sm font-medium text-gray-500">{body}</p>
      </div>
      <div>
        <button
          onClick={deleteBlog}
          className="bg-red-600 text-white rounded-lg px-2 py-1 font-semibold cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
