import { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "../../atom/button";
import { EmptyIcon } from "../../icons/empty";
import { Pagination } from "../../atom/pagination";
import { queryClient } from "../../../providers/query";
import { SearchContext } from "../../../providers/search";
import { DialogContext } from "../../../providers/dialog";
import { useSetEditCustomer } from "../../../store/customers.store";
import {
  removeCustomer,
  getCustomersList,
  convertAvatarToSrc,
} from "../../../apis/customers.api";

const CustomerRow: React.FC<{
  customer: ICustomer;
  onClickRemove: (_: number) => void;
  setEditingCustomer: (_: ICustomer) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ customer, setDialogOpen, onClickRemove, setEditingCustomer }) => {
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
        <Button
          onClick={() => {
            setEditingCustomer(customer);
            setDialogOpen(true);
          }}
        >
          Edit
        </Button>
        <Button varient="danger" onClick={() => onClickRemove(customer.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export const CustomersList = () => {
  const [page, setPage] = useState<number>(1);
  const { search } = useContext(SearchContext);
  const { setOpen: setDialogOpen } = useContext(DialogContext);

  const customers = useQuery({
    queryKey: ["customers-list", search, page],
    queryFn: () => getCustomersList({ search: search?.trim?.(), page }),
  });
  const deleteCustomer = useMutation({
    mutationKey: ["remove-customer"],
    mutationFn: removeCustomer,
    onSuccess: () => {
      console.log("done");
      queryClient.invalidateQueries({ queryKey: ["customers-list"] });
    },
    onError: (e) => console.log(e),
  });
  const setEditingCustomer = useSetEditCustomer(
    (state) => state.setEditingCustomer
  );

  const onClickRemoveCustomer = (id: number) => {
    deleteCustomer.mutate(id);
  };

  return (
    <section className="mx-auto max-w-[1000px] mt-20">
      <div className="grid grid-cols-1 gap-y-2 mt-4">
        {(customers.data?.list || []).map((el) => (
          <CustomerRow
            key={el.id}
            customer={el}
            setDialogOpen={setDialogOpen}
            onClickRemove={onClickRemoveCustomer}
            setEditingCustomer={setEditingCustomer}
          />
        ))}
        {!customers.data?.list?.length && (
          <div className="w-full flex justify-center">
            <EmptyIcon className="w-30 h-30" />
          </div>
        )}
      </div>
      <div className="pt-4">
        <Pagination
          page={page}
          onChangePage={setPage}
          disabled={customers.isPending}
          totalPages={customers.data?.totalPages || 0}
        />
      </div>
    </section>
  );
};
