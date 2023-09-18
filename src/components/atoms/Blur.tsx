import { type HTMLAttributes, type JSX } from "react";

type BlurProps = HTMLAttributes<HTMLElement>;

function Blur({ children, className, ...props }: BlurProps): JSX.Element {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

export default Blur;
