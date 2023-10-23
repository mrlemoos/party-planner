import {
  type ReactNode,
  type ComponentProps,
  type HTMLAttributes,
  type JSX,
} from 'react';

import cls from 'classnames';

import Loading from '../atoms/Loading';

type HTMLElementAttributes = Omit<HTMLAttributes<HTMLElement>, 'children'>;
type LoadingProps = ComponentProps<typeof Loading>;
type PickedLoadingProps = Pick<
  LoadingProps,
  'emojiClassName' | 'hasPartyEmoji' | 'isLogoMinimum'
>;

interface CoverLoadingProps extends HTMLElementAttributes, PickedLoadingProps {
  labelClassName?: string;
  children?: ReactNode;
}

export default function CoverLoading({
  className,
  emojiClassName,
  labelClassName,
  hasPartyEmoji,
  children,
  isLogoMinimum = false,
  ...props
}: CoverLoadingProps): JSX.Element {
  return (
    <div
      className={cls(
        'fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center',
        className,
      )}
      {...props}
    >
      <Loading
        hasPartyEmoji={hasPartyEmoji}
        emojiClassName={emojiClassName}
        className={labelClassName}
        isLogoMinimum={isLogoMinimum}
      >
        {children}
      </Loading>
    </div>
  );
}
