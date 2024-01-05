import { type HTMLAttributes } from 'react'

import FontSans from '@root/styles/fonts/font-sans'
import merge from '@root/util/merge'

type $$HTMLParagraphAttributes = HTMLAttributes<HTMLParagraphElement>

interface ParagraphProps extends $$HTMLParagraphAttributes {
  /**
   * Whether the paragraph should be muted (lighter color).
   *
   * @default false
   */
  isMuted?: boolean
}

/**
 * A paragraph of text.
 */
function Paragraph({ children, className, isMuted = false, ...props }: ParagraphProps): JSX.Element {
  return (
    <p
      className={merge(
        FontSans.className,
        'leading-7 [&:not(:first-child)]:mt-6',
        {
          'text-sm text-muted-foreground': isMuted,
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export default Paragraph
