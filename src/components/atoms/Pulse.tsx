import { type HTMLAttributes, type JSX } from "react";

import cls from "classnames";

type PulseProps = HTMLAttributes<HTMLElement>;

function Pulse({ children, className, ...props }: PulseProps): JSX.Element {
  return (
    <div {...props} className={cls("animate-pulse", className)}>
      {children}
    </div>
  );
}

export default Pulse;
