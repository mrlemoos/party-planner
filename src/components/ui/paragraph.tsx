import { type HTMLAttributes } from 'react'

import classes from '@root/util/classes'

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
      className={classes(
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
