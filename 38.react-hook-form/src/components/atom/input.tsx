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
      <input className={className || "border border-gray-300 p-3"} {...props} />
      {!!error && <p>{error}</p>}
    </div>
  );
};
