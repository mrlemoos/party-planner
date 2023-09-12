import { type ButtonHTMLAttributes, type ReactNode, type JSX } from "react";

import cls from "classnames";

// #region Interfaces & Types

type OmittedHTMLButtonElementAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "content">;

interface IconButtonProps extends OmittedHTMLButtonElementAttributes {
  children?: never;
  icon: ReactNode;
}

// #endregion

export default function IconButton({ icon, className, type = "button", ...props }: IconButtonProps): JSX.Element {
  return (
    <button className={cls("flex justify-center items-center cursor-pointer", className)} type={type} {...props}>
      {icon}
    </button>
  );
}
