import { HTMLAttributes, type ReactElement } from "react";

type ContainerProps = HTMLAttributes<HTMLElement>;

const Container = ({ children, className, style, ...props }: ContainerProps): ReactElement => (
  <div
    className={className}
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
