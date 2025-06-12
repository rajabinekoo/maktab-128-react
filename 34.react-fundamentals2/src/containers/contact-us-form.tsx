import { z } from "zod";
import React from "react";
import toast from "react-hot-toast";

import { Button } from "../components/button";
import { classNames } from "../utils/className";
import { TextInput } from "../components/text-input";
import { contactUsFormValidation } from "../validations/contact-us-validation";

interface IValuesSchema {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
}

export const ContactUsForm: React.FC = () => {
  const [values, setValues] = React.useState<IValuesSchema>({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
  });
  const [errors, setErrors] = React.useState<Partial<IValuesSchema>>({});

  const changeValue = (k: keyof IValuesSchema, v: string) => {
    setValues({ ...values, [k]: v });
    const e = { ...errors };
    delete e[k];
    setErrors(e);
  };

  const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    try {
      contactUsFormValidation(values);
      toast.success("Submitted!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<IValuesSchema> = {};
        for (const i of error.issues) {
          errors[i.path[0] as keyof IValuesSchema] = i.message;
        }
        setErrors(errors);
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className={classNames(
        "max-w-[600px] w-full border border-slate-800",
        "rounded-md px-4 py-3 bg-white shadow space-y-5"
      )}
    >
      <p className="text-lg font-semibold text-center text-slate-900">
        Contact us
      </p>
      <TextInput
        value={values.firstname}
        error={errors.firstname}
        label="Firstname"
        placeholder="Enter your first name"
        onChange={(event) => changeValue("firstname", event.target.value)}
      />
      <TextInput
        value={values.lastname}
        error={errors.lastname}
        label="Lastname"
        placeholder="Enter your last name"
        onChange={(event) => changeValue("lastname", event.target.value)}
      />
      <TextInput
        value={values.address}
        error={errors.address}
        label="Address"
        placeholder="Enter your address"
        onChange={(event) => changeValue("address", event.target.value)}
      />
      <TextInput
        value={values.email}
        error={errors.email}
        label="Email"
        placeholder="Enter your email"
        onChange={(event) => changeValue("email", event.target.value)}
      />
      <Button disabled={Object.keys(errors).length > 0} title="Submit" />
    </form>
  );
};
