import { notFound } from "next/navigation";

async function getQuoteById(id: string): Promise<IQuote> {
  const response = await fetch(`https://dummyjson.com/quotes/${id}`);
  return response.json();
}

async function getQuote(page: number) {
  const res = await fetch(
    `https://dummyjson.com/quotes?skip=${(page - 1) * 30}`
  );
  const { quotes, total }: IQuoteList = await res.json();
  return { quotes, total };
}

async function getAllQuotes(): Promise<Array<IQuote>> {
  const quotesList: Array<IQuote> = [];
  const { quotes, total } = await getQuote(1);
  // quotesList.push(...quotes);
  const totalPages = Math.ceil(total / 30);
  const requests: Array<Promise<{ quotes: Array<IQuote>; total: number }>> = [];
  for (let page = 2; page <= totalPages; page++) requests.push(getQuote(page));
  const results = await Promise.all(requests);
  for (const { quotes } of results) quotesList.push(...quotes);
  return quotesList;
}

export async function generateStaticParams() {
  const quotes = await getAllQuotes();
  return quotes.map((el) => ({ id: el.id.toString() }));
}

export const generateMetadata = async ({ params }: IParams<{ id: string }>) => {
  const { id } = await params;
  const quote = await getQuoteById(id);
  return {
    title: `${quote.author} quote - ${quote.id}`,
    description: quote.quote,
  };
};

const QuoteDetail = async ({ params }: IParams<{ id: string }>) => {
  const { id } = await params;
  const quote = await getQuoteById(id);
  console.log("quote", quote);
  if (
    (quote as unknown as { message: string })?.message?.includes("not found")
  ) {
    return notFound();
  }
  return (
    <main className="max-w-[500px] w-full container mx-auto py-5 space-y-4">
      <p className="text-lg">{quote.quote}</p>
      <p className="text-sm font-semibold text-slate-500">- {quote.author}</p>
    </main>
  );
};

export default QuoteDetail;

// ISR: Increamental Site Regeneration
export const revalidate = 1800;
// export const dynamicParams = true;