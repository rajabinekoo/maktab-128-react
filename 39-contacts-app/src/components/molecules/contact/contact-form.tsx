import { useContext, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Input } from "../../atom/input";
import { Button } from "../../atom/button";
import { AvatarInput } from "../../atom/avatar-input";
import { DialogContext } from "../../../providers/dialog";
import { fileToBase64 } from "../../../utils/file-to-base64";
import { base64toFile } from "../../../utils/base64-to-file";
import { contactsActions } from "../../../redux/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-redux";
import {
  contactFormSchema,
  type contactFormSchemaType,
} from "../../../validations/contact-form-validation";

export const ContactForm = () => {
  const { setOpen } = useContext(DialogContext);

  const dispatch = useAppDispatch();
  const editingContact = useAppSelector(
    (state) => state.contacts.editingContact
  );
  const form = useForm<contactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
  });

  const submit = async (data: contactFormSchemaType) => {
    const avatar = await fileToBase64(data.avatar);
    if (editingContact) {
      dispatch(
        contactsActions.update({
          id: editingContact.id,
          name: data.name,
          email: data.email,
          avatar,
        })
      );
    } else {
      dispatch(
        contactsActions.add({
          avatar,
          name: data.name,
          email: data.email,
        })
      );
    }
    form.reset({ name: "", email: "" });
    setOpen(false);
  };

  useEffect(() => {
    if (!editingContact) return;
    form.reset({
      ...editingContact,
      avatar: base64toFile(editingContact.avatar, "avatar"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingContact]);

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="gap-y-3 grid grid-cols-1 w-full"
    >
      <AvatarInput name="avatar" control={form.control} />
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
