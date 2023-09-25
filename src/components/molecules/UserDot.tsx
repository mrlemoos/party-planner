import { type HTMLAttributes, memo, type CSSProperties } from 'react';

import cls from 'classnames';

import useCachedUserAvatarAppearance from '@root/hooks/useCachedUserAvatarAppearance';
import Tooltip from '@root/components/atoms/Tooltip';

// #region Interfaces & Types

type HTMLElementAttributes = HTMLAttributes<HTMLElement>;
type OmittedHTMLElementAttributes = Omit<
  HTMLElementAttributes,
  'size' | 'aria-labelledby' | 'children'
>;

type OmittedCSSProperties = Omit<
  CSSProperties,
  'height' | 'width' | 'backgroundColor' | 'color'
>;

interface UserDotProps extends OmittedHTMLElementAttributes {
  /** @ignore */
  children?: never;
  /**
   * The user ID to use for the user dot. This is used to determine the
   * background and foreground colors of the dot that will be displayed via the
   * `getUserAvatarAppearance` function from the
   * {@link useCachedUserAvatarAppearance}.
   *
   * @see {@link useCachedUserAvatarAppearance}
   */
  userId: string;
  /**
   * The user display name to use for the user dot. This is used as the tooltip
   * content.
   */
  userDisplayName: string;
  /**
   * The size of the user dot. If not specified, defaults to `"medium"`.
   *
   * Given the size is `'small'`, the height and width will be equivalent to
   * `4px`. Given the size is `'medium'`, the height and width will be
   * equivalent to `8px`. Given the size is `'large'`, the height and width
   * will be equivalent to `12px`.
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The style of the user dot. This will be merged with the default style
   * properties.
   */
  style?: OmittedCSSProperties;
}

// #endregion

const UserDot = memo(
  ({
    userId,
    userDisplayName,
    className,
    size = 'medium',
    style = {},
    ...props
  }: UserDotProps) => {
    const { getUserAvatarAppearance } = useCachedUserAvatarAppearance();

    const { backgroundColor, foregroundColor } = getUserAvatarAppearance(
      userId,
      { orDefaultsTo: 'random' },
    );

    const tooltipId = `${userId}-user-dot-tooltip`;

    return (
      <Tooltip content={userDisplayName} id={tooltipId} side="bottom">
        <div
          {...props}
          className={cls(
            'rounded-md',
            {
              'h-1 w-1': size === 'small',
              'h-2 w-2': size === 'medium',
              'h-3 w-3': size === 'large',
            },
            className,
          )}
          style={{ backgroundColor, color: foregroundColor, ...style }}
          aria-labelledby={tooltipId}
        />
      </Tooltip>
    );
  },
);

UserDot.displayName = 'UserDot';

export default UserDot;
