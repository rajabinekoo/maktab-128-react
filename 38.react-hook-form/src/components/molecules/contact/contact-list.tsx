import { useContext } from "react";
import { ContactContext } from "../../../providers/contact";

export const ContactsList = () => {
  const { dispatch, contacts } = useContext(ContactContext);
  return (
    <div>
      <p>Contacts</p>
      {contacts.map((el) => (
        <div className="flex flex-nowrap gap-x-2">
          <span key={el.id}>
            {el.name} - {el.email}
          </span>
          <button onClick={() => dispatch({ type: "DELETE", payload: el.id })}>
            remove
          </button>
          <button onClick={() => dispatch({ type: "SET_EDIT", payload: el })}>
            edit
          </button>
        </div>
      ))}
    </div>
  );
};
