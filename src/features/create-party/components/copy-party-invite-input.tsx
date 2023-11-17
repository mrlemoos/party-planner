'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'

import { CheckIcon, ClipboardIcon } from '@radix-ui/react-icons'

import FontMonospace from '@root/styles/fonts/font-monospace'
import merge from '@root/util/merge'

/**
 * The time to live of the visual feedback that the party ID was copied to the clipboard.
 */
const COPY_VISUAL_FEEDBACK_TTL = 15_000

interface CopyPartyInviteInputProps {
  /**
   * The party ID to be copied.
   */
  partyId: string
  /**
   * Class names to be appended to the input class names
   */
  className?: string
}

/**
 * The component that allows the user to copy the party ID to the clipboard once the party is created.
 *
 * @props {@link CopyPartyInviteInputProps}
 */
function CopyPartyInviteInput({ partyId, className }: CopyPartyInviteInputProps): JSX.Element {
  const [isCopiedToClipboard, setCopiedToClipboard] = useState(false)

  const handleCopyToClipboard = useCallback(() => setCopiedToClipboard(true), [])

  useEffect(() => {
    if (!isCopiedToClipboard) {
      // NOTE: The progress bar should not be shown if the party ID is not copied to the clipboard. This is a business
      // rule that should be enforced by the UI.
      return
    }

    const timeout = setTimeout(() => {
      setCopiedToClipboard(false)
    }, COPY_VISUAL_FEEDBACK_TTL)

    return () => clearTimeout(timeout)
  }, [isCopiedToClipboard])

  return (
    <Fragment>
      <span className='font-semibold'>Click on the ID to copy the invite 👇</span>
      <button
        className='m-0 flex w-full cursor-pointer items-center gap-2 border-none bg-transparent p-0'
        type='button'
        onClick={handleCopyToClipboard}
      >
        <span
          className={merge(
            className,
            'flex h-9 w-full items-center justify-center rounded-md border border-purple-100 bg-background text-foreground dark:border-purple-900/50',
            FontMonospace.className,
          )}
        >
          {partyId}
        </span>
        <div
          aria-hidden='true'
          className={merge(
            'flex h-9 w-9 items-center justify-center rounded-md',
            isCopiedToClipboard ? 'bg-green-500 text-white' : 'border border-gray-500 bg-background text-foreground',
          )}
        >
          {isCopiedToClipboard ? <CheckIcon /> : <ClipboardIcon />}
        </div>
      </button>
    </Fragment>
  )
}

export default CopyPartyInviteInput
