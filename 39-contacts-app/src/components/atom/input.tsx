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
    <>
      <input className={className || "w-full border border-gray-300 px-3 py-2 rounded-lg"} {...props} />
      {!!error && <p>{error}</p>}
    </>
  );
};
