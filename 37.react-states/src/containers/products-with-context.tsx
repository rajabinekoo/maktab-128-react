import { createContext, useContext, useState } from "react";
import { productsList } from "../data/products";

const SearchContext = createContext<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}>({ search: "", setSearch: () => undefined });

const ProductsList = () => {
  const { search } = useContext(SearchContext);
  return (
    <div className="mt-10 space-y-5">
      {productsList
        .filter((el) => new RegExp(search, "gi").test(el.title))
        // .filter((el) => el.title.toLowerCase().includes(search.toLowerCase()))
        .map((el) => (
          <p key={el.id}>{el.title}</p>
        ))}
    </div>
  );
};

const ProductsSearch = () => {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <input
      placeholder="search"
      className="border border-gray-300 p-3"
      value={search}
      onChange={(event) => setSearch?.(event.target.value)}
    />
  );
};

export const ProductsWithContext = () => {
  //   const [search, setSearch] = useState<string>("");
  return (
    <div className="p-7">
      {/* <SearchContext value={{ search, setSearch }}> */}
      <SearchProvider>
        <ProductsSearch />
        <ProductsList />
      </SearchProvider>
      {/* </SearchContext> */}
    </div>
  );
};

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<string>("");
  return (
    <SearchContext value={{ search, setSearch }}>{children}</SearchContext>
  );
};
