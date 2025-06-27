import React from "react";
import { classNames } from "../utils/className";

interface ITextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextInput: React.FC<ITextInputProps> = ({
  value,
  error,
  label,
  placeholder = "",
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-900">
        {label}
      </label>
      <input
        className={classNames(
          "w-full border border-slate-500 rounded-md",
          "px-3 py-2 text-slate-900 placeholder:text-xs placeholder:font-medium",
          !error ? "" : "!border-red-500"
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {!!error && <p className="text-xs font-semibold text-red-400">{error}</p>}
    </div>
  );
};
