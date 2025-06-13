import { classNames } from "../utils/className";

type color = "primary" | "secondary";

interface IButtonProps {
  title: string;
  color?: color;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function extractColorStyle(color: color) {
  return color === "primary"
    ? "bg-slate-950 disabled:!bg-slate-600"
    : "bg-violet-950 disabled:!bg-violet-600";
}

export const Button: React.FC<IButtonProps> = ({
  title,
  color = "primary",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        extractColorStyle(color),
        "rounded-md text-white font-semibold",
        "w-full py-2"
      )}
    >
      {title}
    </button>
  );
};
