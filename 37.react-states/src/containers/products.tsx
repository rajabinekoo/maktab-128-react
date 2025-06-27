import { useState } from "react";
import { productsList } from "../data/products";

const ProductsList: React.FC<{ search?: string }> = ({ search = "" }) => {
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

const ProductsSearch: React.FC<{
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}> = ({ search = "", setSearch }) => {
  return (
    <input
      placeholder="search"
      className="border border-gray-300 p-3"
      value={search}
      onChange={(event) => setSearch?.(event.target.value)}
    />
  );
};

export const Products = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="p-7">
      <ProductsSearch search={search} setSearch={setSearch} />
      <ProductsList search={search} />
    </div>
  );
};
