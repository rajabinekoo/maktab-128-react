import { Link } from "react-router";

import { Button } from "../../atom/button";
import { SearchForm2 } from "../search/search-form";

export const CustomerHeader: React.FC = () => {
  return (
    <section className="mx-auto max-w-[1000px]">
      <div className="flex items-center justify-between">
        <p className="text-slate-900 text-3xl">Customers</p>
        <SearchForm2 />
        <Link to="/customers/new">
          <Button>Add Customer</Button>
        </Link>
      </div>
    </section>
  );
};
