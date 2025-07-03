import { useCallback, useContext, useEffect, useMemo, useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../atom/input";
import { ContactContext } from "../../../providers/contact";
import { contactFormSchema } from "../../../validations/contact-form-validation";

export const ContactForm = () => {
  const count = useRef<number>(0);
  const phoneInputRef = useRef<HTMLInputElement>(undefined);
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

  useEffect(() => {
    if (!phoneInputRef.current) return;
    phoneInputRef.current.oninput = () => {
      console.log(phoneInputRef.current?.value);
    };
    document.addEventListener("click", (event) => {
      console.log(event.target === phoneInputRef.current);
    });
  }, [phoneInputRef]);

  return (
    <>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-nowrap gap-x-2"
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Input placeholder="name" error={error?.message} {...field} />
            );
          }}
        />
        <div>
          <input
            placeholder="email"
            className="border border-gray-300 p-3"
            {...form.register("email")}
          />
          {!!errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <input
            ref={phoneInputRef as React.Ref<HTMLInputElement>}
            placeholder="phone"
            name="phone"
            className="border border-gray-300 p-3"
          />
        </div>
        <button onClick={() => count.current++} type="submit">
          {editingContact ? "Update" : "Add"}
        </button>
      </form>
      <div>submit count: {count.current}</div>
    </>
  );
};
