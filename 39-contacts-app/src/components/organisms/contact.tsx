import { useContext, useEffect } from "react";

import { Dialog } from "../atom/dialog";
import { SearchProvider } from "../../providers/search";
import { ContactProvider } from "../../providers/contact";
import { ContactForm } from "../molecules/contact/contact-form";
import { ContactsList } from "../molecules/contact/contact-list";
import { contactsActions } from "../../redux/slices/contactSlice";
import { ContactsHeader } from "../molecules/contact/contact-header";
import { DialogContext, DialogProvider } from "../../providers/dialog";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";

const DialogForm: React.FC = () => {
  const { open } = useContext(DialogContext);
  const dispatch = useAppDispatch();
  const editingContact = useAppSelector(
    (state) => state.contacts.editingContact
  );

  useEffect(() => {
    if (open) return;
    if (!editingContact) return;
    dispatch(contactsActions.clearEdit());
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
