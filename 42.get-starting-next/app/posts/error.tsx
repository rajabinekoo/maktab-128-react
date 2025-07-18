"use client";

const ErrorBoundary: React.FC<IErrorBoundary> = ({ error }) => {
  return <p>{error.message}</p>;
};

export default ErrorBoundary;
