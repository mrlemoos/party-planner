'use client';

import {
  type HTMLAttributes,
  type ReactNode,
  type JSX,
  type ComponentProps,
  useMemo,
} from 'react';

import cls from 'classnames';

import Tooltip from '@root/components/atoms/Tooltip';
import useCachedUserAvatarAppearance from '@root/hooks/useCachedUserAvatarAppearance';

// #region Interfaces & Types

type TooltipProps = ComponentProps<typeof Tooltip>;
type TooltipSide = TooltipProps['side'];

interface AvatarProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to render inside the avatar. If a string is provided, only the
   * first character will be rendered.
   *
   * @see {@link ReactNode}
   */
  children: ReactNode;

  /**
   * The custom content to render in the tooltip. If not provided, the
   * {@link children} prop will be used.
   *
   * @see {@link ReactNode}
   */
  tooltipContent?: ReactNode;

  /**
   * Given true, this property will render a crown emoji over the user's avatar
   * to indicate that they are the party owner.
   *
   * @default false
   *
   * @see {@link crownClassName}
   */
  isPartyOwner?: boolean;

  /**
   * This property is used to apply a custom class name to the crown emoji.
   *
   * Note that this property is only used given the {@link isPartyOwner}
   * property is `true`.
   *
   * @see {@link isPartyOwner}
   */
  crownClassName?: string;

  /**
   * This property is used to apply a custom size to the avatar.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * The side of the avatar that the {@link Tooltip} renders on.
   *
   * @default 'left'
   *
   * @see {@link TooltipSide}
   * @see {@link TooltipProps}
   */
  tooltipSide?: TooltipSide;

  /**
   * Given true, this property will prevent the {@link Tooltip} from rendering,
   * even if the {@link tooltipContent} prop is provided.
   *
   * @default false
   *
   * @see {@link tooltipContent}
   * @see {@link tooltipSide}
   * @see {@link Tooltip}
   */
  preventTooltip?: boolean;

  /**
   * The user ID of the user that the avatar belongs to. This prop is necessary
   * to ensure that the avatar renders the background and foreground colors in a
   * coherent fashion.
   */
  userId: string;

  /**
   * Boolean indicating whether the avatar is disabled. If that is the case, the
   * avatar will be rendered with a lower opacity with neutral colors.
   *
   * @default false
   */
  isDisabled?: boolean;
}

// #endregion

/**
 * The `Avatar` component is used to render a user's avatar. This component
 * supports rendering a crown emoji over the user's avatar to indicate that they
 * are the party owner.
 *
 * It renders a random background color and the first character of the user's
 * display name.
 */
export default function Avatar({
  children,
  className,
  isPartyOwner = false,
  crownClassName,
  size = 'medium',
  tooltipContent = (
    <span
      className={cls('font-medium', size === 'small' ? 'text-xs' : 'text-sm')}
    >
      {children}
    </span>
  ),
  tooltipSide = 'left',
  preventTooltip = false,
  userId,
  isDisabled = false,
  ...props
}: AvatarProps): JSX.Element {
  const { getUserAvatarAppearance } = useCachedUserAvatarAppearance();

  const { foregroundColor, backgroundColor } = useMemo(
    () =>
      getUserAvatarAppearance(userId, {
        orDefaultsTo: isDisabled
          ? {
              backgroundColor: '#e2e8f0',
              foregroundColor: '#777',
            }
          : 'random',
      }),
    [getUserAvatarAppearance, userId, isDisabled]
  );

  return (
    <Tooltip
      side={tooltipSide}
      sideOffset={4}
      content={preventTooltip ? null : tooltipContent}
    >
      <div
        className={cls(
          'rounded-full border-[1px] border-coal dark:border-white',
          'font-bold flex justify-center items-center cursor-default',
          {
            relative: isPartyOwner,
            'border-gray-500': isDisabled,
          },
          size === 'small' ? 'w-6 h-6 text-xs' : 'w-8 h-8',
          className
        )}
        {...props}
        style={{ backgroundColor }}
      >
        {isPartyOwner && (
          <span
            className={cls(
              'absolute -top-4 -right-[5px] text-xl rotate-[30deg]',
              crownClassName
            )}
          >
            👑
          </span>
        )}
        {typeof children === 'string' ? (
          <span
            className={cls({
              'text-xs': size === 'small',
            })}
            style={{ color: foregroundColor }}
          >
            {children.charAt(0).toUpperCase()}
          </span>
        ) : (
          children
        )}
      </div>
    </Tooltip>
  );
}
