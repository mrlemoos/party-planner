import { HTMLAttributes, useMemo, type JSX, CSSProperties } from 'react';

import * as colors from 'tailwindcss/colors';

import cls from 'classnames';

type BadgeStyleProperties = Omit<CSSProperties, 'backgroundColor'>;

interface BadgeProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'content' | 'style'> {
  /**
   * The color of the badge. This corresponds to the TailwindCSS color palette.
   *
   * @see {@link https://tailwindcss.com/docs/customizing-colors}
   * @see {@link colorVariant}
   *
   * @default 'indigo'
   */
  color?: keyof typeof colors;

  /**
   * The object of CSS properties to apply to the badge.
   *
   * @see {@link BadgeStyleProperties}
   * @see {@link CSSProperties}
   *
   * @see {@link https://reactjs.org/docs/dom-elements.html#style}
   */
  style?: BadgeStyleProperties;
}

function Badge({
  children,
  className,
  style,
  color = 'indigo',
  ...props
}: BadgeProps): JSX.Element {
  const combinedStyle = useMemo<CSSProperties>(() => {
    const backgroundColor =
      typeof colors[color] === 'object'
        ? colors[color][500]
        : (colors[color] as string);

    return {
      ...style,
      backgroundColor,
    };
  }, [style, color]);

  return (
    <span
      className={cls('px-2 py-1 text-sm rounded-md', className)}
      style={combinedStyle}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
