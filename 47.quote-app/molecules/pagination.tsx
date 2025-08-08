"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationContext } from "../providers/pagination-provider";

interface IPagination {
  queryKey?: string;
}

export const Pagination: React.FC<IPagination> = ({ queryKey = "page" }) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { push } = useRouter();
  const { totalPages } = React.useContext(PaginationContext);

  const page = React.useMemo(() => {
    return Number(searchParams.get(queryKey) || 1);
  }, [searchParams]);

  const onNavigate = (mode: "next" | "prev") => {
    if (!searchParams || !path) return;
    const q = new URLSearchParams(searchParams.toString());
    let newPage = page;
    if (mode === "next") newPage += 1;
    if (mode === "prev") newPage -= 1;
    if (newPage > totalPages) return;
    if (newPage < 1) return;
    q.set("page", newPage.toString());
    push(path + "?" + q.toString());
  };

  return (
    <div className="flex justify-center gap-4 items-center">
      <button onClick={() => onNavigate("prev")} className="cursor-pointer">
        <FaArrowLeft />
      </button>
      <p>{page}</p>
      <button onClick={() => onNavigate("next")} className="cursor-pointer">
        <FaArrowRight />
      </button>
    </div>
  );
};
