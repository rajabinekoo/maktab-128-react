import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CgSpinnerTwo } from "react-icons/cg";

import { Input } from "../../atom/input";
import { Button } from "../../atom/button";
import { AvatarInput } from "../../atom/avatar-input";
import { queryClient } from "../../../providers/query";
import { DialogContext } from "../../../providers/dialog";
import { useSetEditCustomer } from "../../../store/customers.store";
import {
  contactFormSchema,
  type contactFormSchemaType,
} from "../../../validations/contact-form-validation";
import {
  addNewCustomer,
  updateCustomer,
  convertAvatarToSrc,
} from "../../../apis/customers.api";

export const CustomerForm = () => {
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const { setOpen } = useContext(DialogContext);

  const form = useForm<contactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
  });
  const editingCustomer = useSetEditCustomer((state) => state.editingCustomer);
  const newCustomer = useMutation({
    mutationKey: ["new-customer"],
    mutationFn: addNewCustomer,
    onSuccess: () => {
      form.reset({ name: "", email: "" });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customers-list"] });
    },
    onError: (e) => console.log(e),
  });
  const editCustomer = useMutation({
    mutationKey: ["update-customer"],
    mutationFn: updateCustomer,
    onSuccess: () => {
      form.reset({ name: "", email: "" });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customers-list"] });
    },
    onError: (e) => console.log(e),
  });

  const submit = async (data: contactFormSchemaType) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("file", data.avatar);
    if (editingCustomer) {
      editCustomer.mutate({ id: editingCustomer.id, data: formdata });
    } else {
      newCustomer.mutate(formdata);
    }
  };

  useEffect(() => {
    if (!editingCustomer) return;
    form.reset({
      ...editingCustomer,
      avatar: undefined,
    });
    setPreviewAvatar(convertAvatarToSrc(editingCustomer.avatar));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingCustomer]);

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="gap-y-3 grid grid-cols-1 w-full"
    >
      <AvatarInput
        name="avatar"
        preview={previewAvatar}
        control={form.control}
        disabled={newCustomer.isPending}
      />
      <Controller
        name="name"
        control={form.control}
        disabled={newCustomer.isPending}
        render={({ field, fieldState: { error } }) => {
          return <Input placeholder="name" error={error?.message} {...field} />;
        }}
      />
      <Controller
        name="email"
        control={form.control}
        disabled={newCustomer.isPending}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input placeholder="email" error={error?.message} {...field} />
          );
        }}
      />
      <Button disabled={newCustomer.isPending} type="submit">
        <div className="flex items-center justify-center gap-x-2">
          {newCustomer.isPending
            ? "Pending"
            : editingCustomer
            ? "Update"
            : "Add"}
          {newCustomer.isPending && (
            <CgSpinnerTwo className="w-6 h-6 animate-spin" />
          )}
        </div>
      </Button>
    </form>
  );
};
