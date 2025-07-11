import { Button } from "./button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IPaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onChangePage: (_: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  page,
  totalPages,
  onChangePage,
  disabled = false
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <Button
        disabled={page <= 1 || disabled}
        varient="ghost"
        className="!px-1 !py-1"
        onClick={() => onChangePage(page - 1)}
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
        onClick={() => onChangePage(page + 1)}
      >
        <IoIosArrowForward className="w-6 h-6 text-slate-800" />
      </Button>
    </div>
  );
};
