import { type JSX } from "react";

import cls from "classnames";
import Link from "next/link";

interface ErrorBoxProps {
  isContainer?: boolean;
}

/**
 * The <ErrorBox /> component renders a JSX, following up to the {@link ErrorBoxProps} interface.
 *
 * @see {@link ErrorBoxProps}
 */
function ErrorBox({ isContainer }: ErrorBoxProps): JSX.Element {
  return (
    <div
      className={cls(
        "flex flex-col flex-1 justify-center items-center rounded-md bg-red-200 dark:bg-red-500",
        {
          "container mx-auto": isContainer,
        }
      )}
    >
      <h1 className="font-medium text-xl text-red-950 dark:text-red-200">🚨 An error occurred</h1>

      <h2 className="text-gray-500 dark:text-gray-900">Please try again later</h2>

      <Link
        href="/"
        target="_self"
        className="decoration-transparent px-3 py-2 bg-white rounded-md border-[1px] text-red-900 shadow-sm hover:shadow-md"
      >
        Back home
      </Link>
    </div>
  );
}

export default ErrorBox;
