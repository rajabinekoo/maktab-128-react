import React, {useEffect} from "react";
import toast from "react-hot-toast";

import {Button} from "../components/button";
import {classNames} from "../utils/className";
import {TextInput} from "../components/text-input";
import {
    type RegistrationFields,
    registrationValidation,
} from "../validation/registrationValidation.ts";

export const RegistrationForm: React.FC = () => {
    const [values, setValues] = React.useState<RegistrationFields>({
        nationalCode: "",
        firstname: "",
        lastname: "",
        rpasswd: "",
        passwd: "",
        email: "",
        age: "",
    });
    const [errors, setErrors] = React.useState<Partial<RegistrationFields>>({});

    const changeValue = (k: keyof RegistrationFields, v: string) => {
        setValues({...values, [k]: v});
        if (Object.keys(errors).length === 0) return;
        // eager validation
        // if (k !== "rpasswd") {
        //     const fieldError = registrationValidationRecord[k](v);
        //     const e = {...errors};
        //     e[k] = fieldError;
        //     setErrors(e);
        // }
        const e = {...errors};
        delete e[k];
        if (k === "passwd") delete e["rpasswd"];
        setErrors(e);
    };

    const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        // lazy validation
        const errs = registrationValidation(values);
        if (Object.keys(errs).length > 0) setErrors(errs);
        toast.success("Submitted!");
    };

    useEffect(() => {
        console.log("update");
    });

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    useEffect(() => {
        console.log("mount");
        return () => {
            console.log("unmount");
        };
    }, []);

    return (
        <form
            onSubmit={submit}
            className={classNames(
                "max-w-[600px] w-full border border-slate-800",
                "rounded-md px-4 py-3 bg-white shadow space-y-5"
            )}
        >
            <p className="text-lg font-semibold text-center text-slate-900">
                Registration
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
                value={values.age}
                error={errors.age}
                label="Age"
                placeholder="Enter your age"
                onChange={(event) => changeValue("age", event.target.value)}
            />
            <TextInput
                value={values.nationalCode}
                error={errors.nationalCode}
                label="National Code"
                placeholder="Enter your national code"
                onChange={(event) => changeValue("nationalCode", event.target.value)}
            />
            <TextInput
                value={values.passwd}
                error={errors.passwd}
                label="Password"
                placeholder="Enter your password"
                onChange={(event) => changeValue("passwd", event.target.value)}
            />
            <TextInput
                value={values.rpasswd}
                error={errors.rpasswd}
                label="Repeat password"
                placeholder="Enter your repeat password"
                onChange={(event) => changeValue("rpasswd", event.target.value)}
            />
            <TextInput
                value={values.email}
                error={errors.email}
                label="Email"
                placeholder="Enter your email"
                onChange={(event) => changeValue("email", event.target.value)}
            />
            <Button disabled={Object.keys(errors).length > 0}> Submit </Button>
        </form>
    );
};
