import { useCallback, useState } from 'react'

class VirtualClipboardEvent {
  constructor(public readonly clipboardText: string | null) {}
}

interface VirtualClipboardEventHandler {
  (event: VirtualClipboardEvent): void
}

interface UseClipboardProps {
  onCopy: VirtualClipboardEventHandler
}

function useClipboard({ onCopy }: UseClipboardProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn('The browser does not support the Clipboard API.')
        return false
      }

      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(text)

        if (typeof onCopy === 'function') {
          const event = new VirtualClipboardEvent(text)
          onCopy(event)
        }

        return true
      } catch {
        setCopiedText(null)
        return false
      }
    },
    [onCopy],
  )

  return [copiedText, copy]
}

export default useClipboard
