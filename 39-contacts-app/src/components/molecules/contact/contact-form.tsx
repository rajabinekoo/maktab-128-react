import { useContext, useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../atom/input";
import { Button } from "../../atom/button";
import { DialogContext } from "../../../providers/dialog";
import { ContactContext } from "../../../providers/contact";
import { contactFormSchema } from "../../../validations/contact-form-validation";

export const ContactForm = () => {
  const { setOpen } = useContext(DialogContext);
  const { dispatch, editingContact } = useContext(ContactContext);
  const form = useForm<IContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const submit = (data: IContactFormSchema) => {
    if (editingContact)
      dispatch({
        type: "UPDATE",
        payload: { id: editingContact.id, ...data },
      });
    else dispatch({ type: "ADD", payload: data });
    form.reset({ name: "", email: "" });
    setOpen(false);
  };

  useEffect(() => {
    if (!editingContact) return;
    form.reset(editingContact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingContact]);

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="gap-y-3 grid grid-cols-1 max-w-[500px] w-full"
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState: { error } }) => {
          return <Input placeholder="name" error={error?.message} {...field} />;
        }}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input placeholder="email" error={error?.message} {...field} />
          );
        }}
      />
      <Button type="submit">{editingContact ? "Update" : "Add"}</Button>
    </form>
  );
};
