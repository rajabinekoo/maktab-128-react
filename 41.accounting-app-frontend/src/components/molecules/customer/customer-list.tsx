import { useMemo } from "react";

import { Link, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Button } from "../../atom/button";
import { EmptyIcon } from "../../icons/empty";
import { Pagination } from "../../atom/pagination";
import {
  getCustomersList,
  convertAvatarToSrc,
} from "../../../apis/customers.api";

const CustomerRow: React.FC<{
  customer: ICustomer;
}> = ({ customer }) => {
  return (
    <div className="flex justify-between items-center sm:flex-nowrap flex-wrap gap-2 w-full border border-slate-300 rounded-md p-5">
      <div className="flex gap-x-3 items-center">
        <img
          src={convertAvatarToSrc(customer.avatar)}
          className="w-20 aspect-square"
          alt="avatar"
        />
        <div>
          <p>Name: {customer.name}</p>
          <p>Email: {customer.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link to={`/customers/${customer.id}`}>
          <Button>Details</Button>
        </Link>
      </div>
    </div>
  );
};

export const CustomersList = () => {
  const [searchParams] = useSearchParams();

  const page = useMemo(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  const search = useMemo(() => {
    return searchParams.get("s")?.trim?.();
  }, [searchParams]);

  const customers = useQuery({
    queryKey: ["customers-list", search, page],
    queryFn: () =>
      getCustomersList({
        search,
        page,
      }),
  });

  return (
    <section className="mx-auto max-w-[1000px] mt-20">
      <div className="grid grid-cols-1 gap-y-2 mt-4">
        {(customers.data?.list || []).map((el) => (
          <CustomerRow key={el.id} customer={el} />
        ))}
        {!customers.data?.list?.length && (
          <div className="w-full flex justify-center">
            <EmptyIcon className="w-30 h-30" />
          </div>
        )}
      </div>
      <div className="pt-4">
        <Pagination
          queryKey="page"
          disabled={customers.isPending}
          totalPages={customers.data?.totalPages || 0}
        />
      </div>
    </section>
  );
};
