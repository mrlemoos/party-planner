"use client";

import { useCallback, type HTMLAttributes, type ReactElement, type MouseEvent as ReactMouseEvent } from "react";

import cls from "classnames";

import useClipboard from "@root/hooks/useClipboard";

import Icon from "../atoms/Icon";

interface ClipboardBlockProps extends HTMLAttributes<HTMLElement> {
  textToCopy?: string;
}

const ClipboardBlock = ({
  children,
  className,
  textToCopy,
  onClick,
  "aria-label": ariaLabel = "Click to copy party ID to clipboard.",
  ...props
}: ClipboardBlockProps): ReactElement => {
  const [copiedText, copy] = useClipboard();

  const copyText = textToCopy ?? children;

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      copy(String(copyText));

      if (typeof onClick === "function") {
        onClick(event);
      }
    },
    [copyText, copy, onClick]
  );

  const isCopied = copyText === copiedText;

  return (
    <button
      className={cls(
        "rounded-md h-10 min-w-[100px] pl-3 pr-1 py-2 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
        className
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
          "transition-all w-8 h-8 rounded-sm flex justify-center items-center gap-2",
          isCopied ? "bg-green-300" : "bg-transparent"
        )}
        title="Copied to your clipboard"
      >
        {isCopied ? (
          <Icon name="Outline Document Clipboard Check" height={24} width={24} />
        ) : (
          <Icon name="Outline Document Clipboard List" height={24} width={24} />
        )}
      </div>
    </button>
  );
};

export default ClipboardBlock;