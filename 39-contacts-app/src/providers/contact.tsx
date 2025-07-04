import { createContext, useReducer } from "react";
import type { IChildren } from "../../types/global";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = createContext<{
  dispatch: React.ActionDispatch<[action: Action]>;
  contacts: IContact[];
  editingContact?: IContact;
}>({ contacts: [], dispatch: () => undefined });

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

export const ContactProvider: React.FC<IChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { contacts: [] });
  return (
    <ContactContext
      value={{
        dispatch,
        contacts: state.contacts,
        editingContact: state.editingContact,
      }}
    >
      {children}
    </ContactContext>
  );
};
