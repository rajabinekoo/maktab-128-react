import { useContext } from "react";

// import { SearchForm2 } from "../search/search-form";
import { Button } from "../../atom/button";
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
      <div>
        <p>Name: {contact.name}</p>
        <p>Email: {contact.email}</p>
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

  return (
    <section className="mx-auto max-w-[1000px]">
      <div className="grid grid-cols-1 gap-y-2 mt-4">
        {/* <SearchForm2 /> */}
        {contacts
          .filter((el) => {
            if (!search) return true;
            const regex = new RegExp(search, "i");
            return regex.test(el.name) || regex.test(el.email);
          })
          .map((el) => (
            <ContactRow
              key={el.id}
              setDialogOpen={setDialogOpen}
              dispatch={dispatch}
              contact={el}
            />
          ))}
      </div>
    </section>
  );
};
