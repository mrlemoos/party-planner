import { useCallback } from "react";

import useProxy from "@root/hooks/useProxy";

// #region Types & Interfaces

/* internal */ interface UseClipboardProxy {
  text?: string;
}

// #endregion

// #region Utilities & Constants

/* internal */ function $_copyToClipboard(text: string) {
  if ("clipboard" in navigator && navigator.clipboard && "writeText" in navigator.clipboard) {
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
    [proxy]
  );

  return [proxy.text, copyToClipboard];
}
