import { CustomerForm } from "../molecules/customer/customer-form";

export const NewCustomer: React.FC = () => {
  return (
    <main className="w-screen min-h-[calc(100vh-60px)]">
      <div className="max-w-[500px] w-full mx-auto my-14 bg-white p-5 rounded-xl border border-slate-600 shadow-md">
        <p className="mb-4 text-lg font-semibold">New Customer</p>
        <CustomerForm />
      </div>
    </main>
  );
};
