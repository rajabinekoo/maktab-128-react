import { useContext } from "react";

import { Button } from "../../atom/button";
import { DialogContext } from "../../../providers/dialog";
import { SearchForm2 } from "../search/search-form";

export const ContactsHeader: React.FC = () => {
  const { setOpen } = useContext(DialogContext);

  return (
    <section className="mx-auto max-w-[1000px]">
      <div className="flex items-center justify-between">
        <p className="text-slate-900 text-3xl">Contacts</p>
        <SearchForm2 />
        <Button onClick={() => setOpen(true)}>Add Contact</Button>
      </div>
    </section>
  );
};
