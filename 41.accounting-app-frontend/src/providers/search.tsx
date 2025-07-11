import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}>({ search: "", setSearch: () => undefined });

export const SearchProvider: React.FC<IChildren> = ({ children }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchContext value={{ search, setSearch }}>{children}</SearchContext>
  );
};
