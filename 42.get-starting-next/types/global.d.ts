interface IChildren {
  children: React.ReactNode;
}

interface IList {
  skip: number;
  total: number;
  limit: number;
}

interface IErrorBoundary {
  error: Error & { digest?: string };
  reset: () => void;
}
