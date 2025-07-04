import { classNames } from "../../utils/classnames";

type varient = "primary" | "danger";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  varient?: varient;
}

const variantClasses = (v: varient) => {
  switch (v) {
    case "danger":
      return "bg-red-600 text-white hover:bg-red-500";
    default:
      return "bg-slate-600 text-white hover:bg-slate-500";
  }
};

export const Button: React.FC<IButtonProps> = ({
  className,
  children,
  varient = "primary",
  ...props
}) => {
  return (
    <button
      className={
        className
          ? className
          : classNames(
              variantClasses(varient),
              "font-semibold px-3 py-2 rounded-lg cursor-pointer"
            )
      }
      {...props}
    >
      {children}
    </button>
  );
};
