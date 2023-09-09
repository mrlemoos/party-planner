import { type ReactNode, type AnchorHTMLAttributes } from "react";

import Link, { type LinkProps } from "next/link";
import cls from "classnames";

type SecondaryAnchorProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  };

export default function SecondaryAnchor({
  children,
  href,
  target = "_self",
  className,
  ...props
}: SecondaryAnchorProps): JSX.Element {
  return (
    <Link
      href={href}
      target={target}
      className={cls(
        "decoration-transparent text-gray-500 dark:text-gray-300",
        "hover:text-black dark:hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
