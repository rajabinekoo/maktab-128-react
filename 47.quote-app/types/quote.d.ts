interface IQuoteList extends IListResponse {
  quotes: IQuote[];
}

interface IQuote {
  id: number;
  quote: string;
  author: string;
}
