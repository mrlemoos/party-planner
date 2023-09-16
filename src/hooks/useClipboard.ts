import { useCallback } from "react";

import useProxy from "@root/hooks/useProxy";

// #region Types & Interfaces

interface UseClipboardProxy {
  text?: string;
}

// #endregion

// #region Utilities & Constants

function $_copyToClipboard(text: string) {
  if ("navigator" in window && "clipboard" in window.navigator && window.navigator.clipboard && "writeText" in window.navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}
// #endregion

export default function useClipboard(): [string | undefined, (text: string) => void] {
  const proxy = useProxy<UseClipboardProxy>({});

  const copyToClipboard = useCallback(
    function $copyToClipboard(text: string) {
      $_copyToClipboard(text);

      proxy.text = text;
    },
    [proxy],
  );

  return [proxy.text, copyToClipboard];
}
