"use client";

import { useParams } from "next/navigation";

export const PostId: React.FC = () => {
  const { id } = useParams();
  return <p>PostId: {id}</p>;
};
