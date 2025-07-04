import { useContext, useEffect } from "react";

import { Dialog } from "../atom/dialog";
import { SearchProvider } from "../../providers/search";
import { ContactForm } from "../molecules/contact/contact-form";
import { ContactsList } from "../molecules/contact/contact-list";
import { ContactsHeader } from "../molecules/contact/contact-header";
import { DialogContext, DialogProvider } from "../../providers/dialog";
import { ContactContext, ContactProvider } from "../../providers/contact";

const DialogForm: React.FC = () => {
  const { open } = useContext(DialogContext);
  const { dispatch, editingContact } = useContext(ContactContext);

  useEffect(() => {
    if (open) return;
    if (!editingContact) return;
    dispatch({ type: "SET_EDIT", payload: undefined });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editingContact]);

  return (
    <Dialog title="Contact Form">
      <ContactForm />
    </Dialog>
  );
};

export const ContactsWrapper = () => {
  return (
    <section className="container mx-auto py-7 px-2">
      <ContactProvider>
        <DialogProvider>
          <DialogForm />
          <SearchProvider>
            <ContactsHeader />
            <ContactsList />
          </SearchProvider>
        </DialogProvider>
      </ContactProvider>
    </section>
  );
};
