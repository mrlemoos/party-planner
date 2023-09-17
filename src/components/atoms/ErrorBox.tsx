import { type ReactNode, type JSX, Fragment } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import cls from "classnames";
import Link from "next/link";

import Poppins from "@root/styles/Poppins";

interface ErrorBoxProps {
  /**
   * The boolean that indicates whether the error box will be positioned on the
   * screen as container, therefore, it will be centered via margin-inline and a
   * maximum width relative to the screen size.
   *
   * @default false
   */
  isContainer?: boolean;

  /**
   * An error as string or custom JSX that is rendered. If not provided, the
   * default error message is rendered instead.
   *
   * @default '🚨 An error occurred'
   */
  error?: ReactNode;

  /**
   * The children JSX that is rendered inside the error box if it is necessary
   * to render a custom error message below the "Please try again later"
   * heading. If no children are provided, the component defaults to undefined.
   *
   * @see {@link ReactNode}
   */
  children?: ReactNode;

  /**
   * Boolean to indicate whether the <ErrorBox /> component should render an
   * anchor element that redirects the user to the root page. This is useful if
   * the user is not able to go back to the previous page, for example, if the
   * user is redirected to the root page because of an error or if the user
   * has accessed the page directly via URL.
   *
   * @default true
   */
  hasBackButton?: boolean;

  /**
   * The custom {@link ReactNode} that is renders at the bottom of the error box
   * that commonly contains a button or a link to redirect the user to another
   * page.
   *
   * @see {@link ReactNode}
   */
  footer?: ReactNode;

  /**
   * The boolean that indicates whether the error box should render the "Please
   * try again later" heading. This is useful if the error box is used as a
   * container for other components.
   *
   * **Note that** defining the {@link children} property will override this one.
   *
   * @default false
   */
  hasPleaseTryAgainLater?: boolean;
}

/**
 * The <ErrorBox /> component renders a JSX, following up to the
 * {@link ErrorBoxProps} interface.
 *
 * @see {@link ErrorBoxProps}
 */
function ErrorBox({
  isContainer = false,
  error = "🚨 An error occurred",
  children,
  hasBackButton = true,
  footer,
  hasPleaseTryAgainLater = false,
}: ErrorBoxProps): JSX.Element {
  return (
    <div
      className={cls(
        "flex flex-col flex-1 gap-6 justify-center items-center rounded-lg bg-red-200 dark:bg-light-coal p-4 sm:p-6 border-2 border-red-100 dark:border-coal",
        {
          "container mx-auto": isContainer,
        }
      )}
    >
      <div className='flex items-center gap-1'>
        <Cross2Icon className='text-red-700 dark:text-red-300' height={30} width={30} />
        <h1 className={cls("font-semibold text-2xl text-black dark:text-white", Poppins.className)}>Sorry...</h1>
      </div>

      {children || !hasPleaseTryAgainLater ? (
        <Fragment>{children}</Fragment>
      ) : (
        <h3 className='text-gray-500 dark:text-gray-900'>Please try again later</h3>
      )}
      <h2 className='font-medium text-lg text-black dark:text-white'>{error}</h2>

      {hasBackButton && (
        <Link href='/' target='_self' className='decoration-transparent'>
          Back home
        </Link>
      )}
      {footer}
    </div>
  );
}

export default ErrorBox;
