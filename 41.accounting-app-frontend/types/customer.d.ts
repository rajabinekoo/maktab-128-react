interface ICustomer {
  id: number;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  created_at: string;
}

interface IEditingCustomerState {
  editingCustomer?: ICustomer;
  clearEdit: () => void;
  setEditingCustomer: (_: ICustomer) => void;
}
