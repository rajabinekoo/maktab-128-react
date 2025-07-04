import { useContext, useMemo } from "react";

import { Button } from "../../atom/button";
import { EmptyIcon } from "../../icons/empty";
import { SearchContext } from "../../../providers/search";
import { DialogContext } from "../../../providers/dialog";
import { ContactContext } from "../../../providers/contact";

const ContactRow: React.FC<{
  contact: IContact;
  dispatch: React.ActionDispatch<[action: Action]>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ contact, dispatch, setDialogOpen }) => {
  return (
    <div className="flex justify-between items-center sm:flex-nowrap flex-wrap gap-2 w-full border border-slate-300 rounded-md p-5">
      <div className="flex gap-x-3 items-center">
        <img
          src={contact.avatar}
          className="w-20 aspect-square"
          alt="avatar"
        />
        <div>
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            dispatch({ type: "SET_EDIT", payload: contact });
            setDialogOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          varient="danger"
          onClick={() => dispatch({ type: "DELETE", payload: contact.id })}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export const ContactsList = () => {
  const { dispatch, contacts } = useContext(ContactContext);
  const { search } = useContext(SearchContext);
  const { setOpen: setDialogOpen } = useContext(DialogContext);

  const list = useMemo(() => {
    return contacts.filter((el) => {
      if (!search) return true;
      const regex = new RegExp(search, "i");
      return regex.test(el.name) || regex.test(el.email);
    });
  }, [contacts, search]);

  return (
    <section className="mx-auto max-w-[1000px] mt-20">
      <div className="grid grid-cols-1 gap-y-2 mt-4">
        {list.map((el) => (
          <ContactRow
            key={el.id}
            setDialogOpen={setDialogOpen}
            dispatch={dispatch}
            contact={el}
          />
        ))}
        {!list?.length && (
          <div className="w-full flex justify-center">
            <EmptyIcon className="w-30 h-30" />
          </div>
        )}
      </div>
    </section>
  );
};
