import Link from "next/link";

export const QuoteCard: React.FC<IQuote> = ({ id, quote, author }) => {
  return (
    <Link className="block" href={`/quote/${id}`}>
      <div className="border border-slate-200 rounded-xl px-3 py-2 space-y-3 flex flex-col justify-between w-full h-full">
        <p className="line-clamp-2 font-medium text-lg w-full">{quote}</p>
        <p className="text-slate-400 font-semibold"> - {author}</p>
      </div>
    </Link>
  );
};
