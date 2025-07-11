import { useContext, useEffect } from "react";

import { Dialog } from "../atom/dialog";
import { SearchProvider } from "../../providers/search";
import { ContactProvider } from "../../providers/contact";
import { useSetEditCustomer } from "../../store/customers.store";
import { CustomerForm } from "../molecules/customer/customer-form";
import { CustomersList } from "../molecules/customer/customer-list";
import { CustomerHeader } from "../molecules/customer/customer-header";
import { DialogContext, DialogProvider } from "../../providers/dialog";

const DialogForm: React.FC = () => {
  const { open } = useContext(DialogContext);
  const clearEdit = useSetEditCustomer((state) => state.clearEdit);
  const editingCustomer = useSetEditCustomer((state) => state.editingCustomer);

  useEffect(() => {
    if (open) return;
    if (!editingCustomer) return;
    clearEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editingCustomer]);

  return (
    <Dialog title="Contact Form">
      <CustomerForm />
    </Dialog>
  );
};

export const CustomersWrapper = () => {
  return (
    <section className="container mx-auto py-7 px-2">
      <ContactProvider>
        <DialogProvider>
          <DialogForm />
          <SearchProvider>
            <CustomerHeader />
            <CustomersList />
          </SearchProvider>
        </DialogProvider>
      </ContactProvider>
    </section>
  );
};
