'use client';

import {
  useCallback,
  type HTMLAttributes,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
  useEffect,
} from 'react';

import { ClipboardIcon, CheckIcon } from '@radix-ui/react-icons';
import cls from 'classnames';

import useClipboard from '@root/hooks/useClipboard';

interface ClipboardBlockProps extends HTMLAttributes<HTMLElement> {
  /**
   * The text that will be copied to the clipboard when the button is clicked.
   */
  textToCopy?: string;
}

const ClipboardBlock = ({
  children,
  className,
  textToCopy,
  onClick,
  'aria-label': ariaLabel = 'Click to copy party ID to clipboard.',
  ...props
}: ClipboardBlockProps): ReactElement => {
  const [copiedText, copy] = useClipboard();

  const copyText = textToCopy ?? children;

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      copy(String(copyText));

      if (typeof onClick === 'function') {
        onClick(event);
      }
    },
    [copyText, copy, onClick],
  );

  const isCopied = copyText === copiedText;

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        copy('');
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied, copy]);

  return (
    <button
      className={cls(
        'flex h-10 min-w-[100px] items-center justify-center gap-2 rounded-md bg-gray-100 py-2 pl-3 pr-1 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        className,
      )}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
      type="button"
    >
      <div className="hidden md:block">{children}</div>
      <span className="block md:hidden">Click here to copy party link</span>
      <div
        className={cls(
          'flex h-8 w-8 items-center justify-center gap-2 rounded-sm bg-transparent transition-all',
        )}
        title="Copied to your clipboard"
      >
        {isCopied ? (
          <CheckIcon height={24} width={24} className="text-green-500" />
        ) : (
          <ClipboardIcon height={24} width={24} />
        )}
      </div>
    </button>
  );
};

export default ClipboardBlock;
