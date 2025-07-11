import { create } from "zustand";

export const useSetEditCustomer = create<IEditingCustomerState>()((set) => ({
  editingCustomer: undefined,
  clearEdit: () => set({ editingCustomer: undefined }),
  setEditingCustomer: (c: ICustomer) => set({ editingCustomer: c }),
}));
