import { type TextareaHTMLAttributes } from 'react'

import merge from '@root/util/merge'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * The styled textarea component that whose common usage is for forms with messages, comments or any sort of large text
 * chunks of input.
 *
 * @props {@link TextareaProps}
 */
function Textarea({ className, ...props }: TextareaProps): JSX.Element {
  return (
    <textarea
      className={merge(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export default Textarea
