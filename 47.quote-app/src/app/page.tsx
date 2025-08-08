import { QuoteCard } from "../../molecules/quote-card";
import { Pagination } from "../../molecules/pagination";
import { PaginationProvider } from "../../providers/pagination-provider";

// export const dynamic = "force-dynamic";

async function fetchQuotes(page: string): Promise<IQuoteList> {
  let validPage = Number(page || 1);
  if (isNaN(validPage)) validPage = 1;
  const response = await fetch(
    `https://dummyjson.com/quotes?limit=10&skip=${(validPage - 1) * 10}`,
    {
      next: { revalidate: 30 * 60, tags: ["quotes-list", page || ""] },
    }
  );
  return response.json();
}

const HomePage = async ({ searchParams }: ISearchParams<{ page: string }>) => {
  const { page } = await searchParams;
  const { quotes, total } = await fetchQuotes(page);
  return (
    <main className="space-y-5 py-10 px-2 mx-auto container">
      <p className="text-lg font-semibold">Quotes</p>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {quotes.map((el) => (
          <QuoteCard {...el} key={el.id} />
        ))}
      </section>
      <PaginationProvider totalPages={Math.ceil(total / 10)}>
        <Pagination />
      </PaginationProvider>
    </main>
  );
};

export default HomePage;
