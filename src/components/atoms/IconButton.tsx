import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';

import cls from 'classnames';

// #region Interfaces & Types

type OmittedHTMLButtonElementAttributes = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'content' | 'aria-label'
>;

interface IconButtonProps extends OmittedHTMLButtonElementAttributes {
  /** @ignore */
  children?: never;
  /**
   * The icon that will be rendered in the centre of the native button element.
   * As this is a {@link ReactNode}, it can be any valid JSX or string, but
   * because we use `@radix-ui/react-icons` package to render icons, you might
   * want to pass one of their icon components here to render as the JSX.
   *
   * @see {@link ReactNode}
   */
  icon: ReactNode;

  /**
   * The string that is used to determine a text alternative for the icon, which
   * is used by screen readers to improve accessibility. Differently from the
   * `<img>` native tag element, this prop is passed to the `aria-label` of the
   * native `<button>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#description}
   */
  alt: string;
}

// #endregion

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      className={cls(
        'flex justify-center items-center cursor-pointer',
        className,
      )}
      type={type}
      {...props}
    >
      {icon}
    </button>
  ),
);

IconButton.displayName = 'IconButton';

export default IconButton;
