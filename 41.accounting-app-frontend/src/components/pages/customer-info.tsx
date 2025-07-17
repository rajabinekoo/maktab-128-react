import { Navigate, useParams } from "react-router";
import { CustomerInfo } from "../organisms/customer-info";

export const CustomerInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cid = Number(id);
  if (isNaN(cid) || cid < 1) return <Navigate to="/not-found" />;
  return (
    <main className="mx-auto px-4 container my-14 max-w-[1000px]">
      <CustomerInfo id={cid} />
    </main>
  );
};
