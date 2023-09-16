import { memo, type SVGProps } from "react";

import cls from "classnames";

type XMarkProps = Omit<SVGProps<SVGSVGElement>, "xmlns"> & {
  children?: never;
};

const XMark = memo<XMarkProps>(({ fill = "currentColor", viewBox = "0 0 20 20", className, ...props }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox={viewBox} fill={fill} className={cls("w-5 h-5", className)} {...props}>
    <path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
  </svg>
));

XMark.displayName = "XMark";

export default XMark;
