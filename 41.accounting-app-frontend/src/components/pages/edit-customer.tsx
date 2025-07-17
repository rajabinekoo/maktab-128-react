import { useQuery } from "@tanstack/react-query";
import { CustomerForm } from "../molecules/customer/customer-form";
import { getCustomerInfo } from "../../apis/customers.api";
import { Navigate, useParams } from "react-router";

export const EditCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cid = Number(id);
  const enabled = !isNaN(cid) && cid >= 1;

  const query = useQuery({
    queryKey: ["get-customer-info", cid],
    queryFn: () => getCustomerInfo(cid),
    enabled,
  });

  if (!enabled) return <Navigate to="/not-found" />;

  if (query.isPending || !query.data) return <p>loading...</p>;

  return (
    <main className="w-screen min-h-[calc(100vh-60px)]">
      <div className="max-w-[500px] w-full mx-auto my-14 bg-white p-5 rounded-xl border border-slate-600 shadow-md">
        <p className="mb-4 text-lg font-semibold">Edit Customer</p>
        <CustomerForm editingCustomer={query.data} />
      </div>
    </main>
  );
};
