import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: IContactSliceState = {
  id: 0,
  list: [],
  editingContact: undefined,
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Omit<IContact, "id">>) {
      const id = state.id + 1;
      return {
        ...state,
        id,
        list: [...state.list, { ...action.payload, id }],
      };
    },
    remove(state, action: PayloadAction<number>) {
      return {
        ...state,
        list: state.list.filter((el) => el.id !== action.payload),
      };
    },
    setEdit(state, action: PayloadAction<IContact>) {
      return { ...state, editingContact: action.payload };
    },
    set(state, action: PayloadAction<Array<IContact>>) {
      if (!Array.isArray(action.payload)) return state;
      const lastId = Math.max(...action.payload.map((el) => el.id), 0);
      return {
        ...state,
        id: lastId,
        list: action.payload,
      };
    },
    update(state, action: PayloadAction<IContact>) {
      return {
        ...state,
        editingContact: undefined,
        list: state.list.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        }),
      };
    },
    clearEdit(state) {
      return { ...state, editingContact: undefined };
    },
  },
});

export const contactsActions = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
