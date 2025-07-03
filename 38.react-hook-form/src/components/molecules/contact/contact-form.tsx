import { useCallback, useContext, useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactContext } from "../../../providers/contact";
import { contactFormSchema } from "../../../validations/contact-form-validation";

export const ContactForm = () => {
  const { dispatch, editingContact } = useContext(ContactContext);
  const form = useForm<IContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const submit = useCallback(
    (data: IContactFormSchema) => {
      if (editingContact)
        dispatch({
          type: "UPDATE",
          payload: { id: editingContact.id, ...data },
        });
      else dispatch({ type: "ADD", payload: data });
      form.reset({ name: "", email: "" });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editingContact]
  );

  const errors = useMemo(() => {
    return {
      name: form.formState.errors?.name?.message || "",
      email: form.formState.errors?.email?.message || "",
    };
  }, [form.formState.errors]);

  useEffect(() => {
    if (!editingContact) return;
    form.reset(editingContact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingContact]);

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="flex flex-nowrap gap-x-2"
    >
      <div>
        <input
          placeholder="name"
          className="border border-gray-300 p-3"
          {...form.register("name")}
        />
        {!!errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <input
          placeholder="email"
          className="border border-gray-300 p-3"
          {...form.register("email")}
        />
        {!!errors.email && <p>{errors.email}</p>}
      </div>
      <button type="submit">{editingContact ? "Update" : "Add"}</button>
    </form>
  );
};
