import { useContext } from "react";

import { Button } from "../../atom/button";
import { DialogContext } from "../../../providers/dialog";

export const ContactsHeader: React.FC = () => {
  const { setOpen } = useContext(DialogContext);

  return (
    <section className="mx-auto max-w-[1000px]">
      <div className="flex items-center justify-between">
        <p className="text-slate-900 text-3xl">Contacts</p>
        <Button onClick={() => setOpen(true)}>Add Contact</Button>
      </div>
    </section>
  );
};
