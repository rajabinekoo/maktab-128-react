import { Dialog } from "../atom/dialog";
import { DialogProvider } from "../../providers/dialog";
import { SearchProvider } from "../../providers/search";
import { ContactProvider } from "../../providers/contact";
import { ContactForm } from "../molecules/contact/contact-form";
import { ContactsList } from "../molecules/contact/contact-list";
import { ContactsHeader } from "../molecules/contact/contact-header";

export const ContactsWrapper = () => {
  return (
    <section className="container mx-auto py-7 px-2">
      <ContactProvider>
        <DialogProvider>
          <ContactsHeader />
          <Dialog>
            <ContactForm />
          </Dialog>
          <SearchProvider>
            <ContactsList />
          </SearchProvider>
        </DialogProvider>
      </ContactProvider>
    </section>
  );
};
