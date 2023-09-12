import { HTMLAttributes, type ReactElement } from "react";

import cls from "classnames";

type ContainerProps = HTMLAttributes<HTMLElement>;

const Container = ({ children, className, style, ...props }: ContainerProps): ReactElement => (
  <div
    className={cls("w-screen h-screen", className)}
    style={{
      width: "100vw",
      height: "100vh",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export default Container;
