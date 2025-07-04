interface IContact {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface IState {
  id?: number;
  contacts: IContact[];
  editingContact?: IContact;
}

type Action =
  | { type: "ADD"; payload: Omit<IContact, "id"> }
  | { type: "DELETE"; payload: number }
  | { type: "SET_EDIT"; payload?: IContact }
  | { type: "UPDATE"; payload: IContact }
  | { type: "SET"; payload: IContact[] };
