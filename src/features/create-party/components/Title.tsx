import cls from "classnames";

import Poppins from "@root/styles/Poppins";

export default function Title(): JSX.Element {
  return <h1 className={cls(Poppins.className, "font-semibold text-2xl")}>Let&rsquo;s start the party 🎉</h1>;
}
