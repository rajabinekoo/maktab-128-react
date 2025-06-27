import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface IContact {
  id: number;
  name: string;
  email: string;
}

interface IState {
  id?: number;
  contacts: IContact[];
  editingContact?: IContact;
}

type Action =
  | { type: "ADD"; payload: Omit<IContact, "id"> }
  | { type: "DELETE"; payload: number }
  | { type: "SET_EDIT"; payload: IContact }
  | { type: "UPDATE"; payload: IContact };

const reducer = (state: IState, action: Action) => {
  if (!state.id) state.id = 0;
  switch (action.type) {
    case "ADD": {
      const id = state.id + 1;
      return {
        ...state,
        id,
        contacts: [...state.contacts, { ...action.payload, id }],
      } as IState;
    }
    case "DELETE":
      return {
        ...state,
        contacts: state.contacts.filter((el) => el.id !== action.payload),
      } as IState;
    case "SET_EDIT":
      return { ...state, editingContact: action.payload } as IState;
    case "UPDATE":
      return {
        ...state,
        editingContact: undefined,
        contacts: state.contacts.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        }),
      } as IState;
    default:
      throw new Error("Unknown action.");
  }
};

const ContactContext = createContext<{
  dispatch: React.ActionDispatch<[action: Action]>;
  contacts: IContact[];
  editingContact?: IContact;
}>({ contacts: [], dispatch: () => undefined });

const ContactsList = () => {
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

const ContactForm = () => {
  const { dispatch, editingContact } = useContext(ContactContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onChangeValues = (type: "name" | "email", value: string) => {
    if (type === "name") setName(value);
    if (type === "email") setEmail(value);
  };

  const submit = () => {
    if (editingContact)
      dispatch({
        type: "UPDATE",
        payload: { id: editingContact.id, name, email },
      });
    else dispatch({ type: "ADD", payload: { name, email } });
    setName("");
    setEmail("");
  };

  useEffect(() => {
    if (!editingContact) return;
    setName(editingContact.name);
    setEmail(editingContact.email);
  }, [editingContact]);

  return (
    <div className="flex flex-nowrap gap-x-2">
      <input
        placeholder="name"
        className="border border-gray-300 p-3"
        value={name}
        onChange={(event) => onChangeValues("name", event.target.value)}
      />
      <input
        placeholder="email"
        className="border border-gray-300 p-3"
        value={email}
        onChange={(event) => onChangeValues("email", event.target.value)}
      />
      <button onClick={submit}>{editingContact ? "Update" : "Add"}</button>
    </div>
  );
};

export const ContractsWrapper = () => {
  const [state, dispatch] = useReducer(reducer, { contacts: [] });

  return (
    <div className="p-7">
      <ContactContext
        value={{
          dispatch,
          contacts: state.contacts,
          editingContact: state.editingContact,
        }}
      >
        <ContactForm />
        <ContactsList />
      </ContactContext>
    </div>
  );
};
