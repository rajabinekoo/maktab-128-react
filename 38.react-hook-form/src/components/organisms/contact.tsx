import { ContactProvider } from "../../providers/contact";
import { ContactForm } from "../molecules/contact/contact-form";
import { ContactsList } from "../molecules/contact/contact-list";

export const ContactsWrapper = () => {
  return (
    <div className="p-7">
      <ContactProvider>
        <ContactForm />
        <ContactsList />
      </ContactProvider>
    </div>
  );
};
