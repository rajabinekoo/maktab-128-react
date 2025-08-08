"use client";

import React from "react";

interface IPaginationContext {
  totalPages: number;
}

export const PaginationContext = React.createContext<IPaginationContext>({
  totalPages: 1,
});

export const PaginationProvider: React.FC<
  IChildren & { totalPages: number }
> = ({ children, totalPages }) => {
  return (
    <PaginationContext.Provider value={{ totalPages }}>
      {children}
    </PaginationContext.Provider>
  );
};
