import { classNames } from "../../utils/classnames";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
}

export const Input: React.FC<IInputProps> = ({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        className={classNames(
          className || "w-full border border-gray-300 px-3 py-2 rounded-lg",
          error ? "!border-red-500" : ""
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 mt-1 text-xs font-medium">{error}</p>
      )}
    </div>
  );
};
