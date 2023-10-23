'use client';

import {
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
  type ButtonHTMLAttributes,
} from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import cls from 'classnames';

interface DangerToastProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The custom {@link ReactNode} that corresponds to the header area of the
   * danger toast. By default, it renders this prop inside of a `<span>` tag
   * with the text weight set to `semibold` and the text size slightly larger
   * than the content ({@link children}). It is recommended to use a string
   * literal for this prop.
   *
   * @see {@link ReactNode}
   * @see {@link children}
   */
  header: ReactNode;

  /**
   * The custom {@link ReactNode} that corresponds to the actions area of the
   * danger toast. This node or nodes are rendered inside of a `<div>` tag with
   * the flexbox layout and some small gap between the children. It is
   * recommended to use a button-like component or native HTML element for this
   * prop, such as {@link DangerToast.Action}.
   *
   * If it is necessary to render more than one element inside of the actions,
   * it is recommended to wrap them in a `<Fragment>` component so the layout
   * remains consistent.
   *
   * @see {@link ReactNode}
   */
  action: ReactNode;
}

function DangerToast({
  header,
  children,
  action,
  className,
  ...props
}: DangerToastProps): JSX.Element {
  return (
    <div
      className={cls(
        'flex flex-col gap-y-1 rounded-lg bg-white px-2 py-1 md:w-[420px]',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1 text-rose-800">
        <Cross2Icon height={18} width={18} />
        <span className={cls('text-md font-semibold')}>{header}</span>
      </div>
      <div className="ml-6 flex items-center gap-2 text-black">
        <span className="flex-1 text-sm font-normal">{children}</span>
        <div className={cls('mb-1 flex items-center gap-1 text-sm')}>
          {action}
        </div>
      </div>
    </div>
  );
}

type ActionProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const Action = ({
  children,
  className,
  ...props
}: ActionProps): ReactElement => (
  <button
    {...props}
    className={cls(
      'rounded-md bg-gray-200 px-2 py-1 text-gray-800',
      'hover:bg-gray-300 hover:text-gray-950',
      'transition-colors duration-200 ease-in-out',
      className,
    )}
    type="button"
  >
    {children}
  </button>
);

Action.displayName = 'DangerToast.Action';

DangerToast.Action = Action;

export default DangerToast;
