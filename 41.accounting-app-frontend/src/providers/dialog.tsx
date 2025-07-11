import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DialogContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ open: false, setOpen: () => undefined });

export const DialogProvider: React.FC<IChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return <DialogContext value={{ open, setOpen }}>{children}</DialogContext>;
};
