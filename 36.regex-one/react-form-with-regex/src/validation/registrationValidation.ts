import {validateIranianNationalCode} from "./nationalCode.ts";

export interface RegistrationFields {
    nationalCode: string;
    firstname: string;
    lastname: string;
    rpasswd: string;
    passwd: string;
    email: string;
    age: string;
}

export const registrationValidationRecord: Record<keyof Omit<RegistrationFields, "rpasswd">, (_: string) => string> = {
    nationalCode: validateIranianNationalCode,
    firstname: (value) => !value ? "Required" : /^[a-zA-Z]{3,}$/.test(value) ? "" : "Firstname is a alphabetic field and its length must be more than 2",
    lastname: (value) => !value ? "Required" : /^[a-zA-Z]{5,}$/.test(value) ? "" : "Lastname is a alphabetic field and its length must be more than 4",
    passwd: (value) => !value ? "Required" : /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[\W_]))[A-Za-z\d\W_]{8,}$/g.test(value) ? "" : "Password must contain special characters, lowercase characters, uppercase characters and numbers",
    email: (value) => !value ? "Required" : /^[a-z]\w{4,}@(gmail|yahoo).com$/gi.test(value) ? "" : "Email must be gmail or yahoo",
    age: (value) => !value ? "Required" : isNaN(Number(value)) ? "Age is invalid" : Number(value) <= 0 ? "Age must be more than 0" : Number(value) >= 100 ? "Age must be less than 100" : "",
}

export function registrationValidation(values: RegistrationFields) {
    const errors: Partial<RegistrationFields> = {};
    if (values['rpasswd'] !== values['passwd']) {
        errors['rpasswd'] = "Passwords are not the same"
    }
    for (const key in values) {
        if (key === "rpasswd") continue;
        const k = key as keyof Omit<RegistrationFields, "rpasswd">;
        const err = registrationValidationRecord[k](values[k]);
        if (!err) continue;
        errors[k] = err;
    }
    return errors
}
