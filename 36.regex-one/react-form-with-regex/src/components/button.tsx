import React from "react";
import {classNames} from "../utils/className";

type variant = "primary" | "secondary";

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: variant;
}

function extractColorStyle(variant: variant) {
    return variant === "primary"
        ? "bg-slate-950 disabled:!bg-slate-600"
        : "bg-violet-950 disabled:!bg-violet-600";
}

export const Button: React.FC<IButtonProps> = ({
    variant = "primary",
    children,
    className,
    ...props
}) => {
    return (
        <button
            className={className ? className : classNames(
                extractColorStyle(variant),
                "rounded-md text-white font-semibold",
                "w-full py-2 cursor-pointer hover:bg-slate-600",
            )}
            {...props}
        >
            {children}
        </button>
    );
};
