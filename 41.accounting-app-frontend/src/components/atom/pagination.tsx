import { useSearchParams } from "react-router";
import { Button } from "./button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useMemo } from "react";

interface IPaginationProps {
  queryKey: string;
  totalPages: number;
  disabled?: boolean;
}

export const Pagination: React.FC<IPaginationProps> = ({
  queryKey,
  totalPages,
  disabled = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    return Number(searchParams.get(queryKey)) || 1;
  }, [searchParams]);

  return (
    <div className="flex w-full items-center justify-between">
      <Button
        disabled={page <= 1 || disabled}
        varient="ghost"
        className="!px-1 !py-1"
        onClick={() => setSearchParams({ page: String(page - 1) })}
      >
        <IoIosArrowBack className="w-6 h-6 text-slate-800" />
      </Button>
      <div className="flex justify-center items-center w-7 h-7 border border-slate-300 rounded-lg">
        <p>{page}</p>
      </div>
      <Button
        disabled={page >= totalPages || disabled}
        varient="ghost"
        className="!px-1 !py-1"
        onClick={() => setSearchParams({ page: String(page + 1) })}
      >
        <IoIosArrowForward className="w-6 h-6 text-slate-800" />
      </Button>
    </div>
  );
};
