import { type ComponentProps } from 'react'

import classes from '@root/util/classes'

type InlineCodeProps = ComponentProps<'code'>

function InlineCode({ children, className, ...props }: InlineCodeProps): JSX.Element {
  return (
    <code
      className={classes(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  )
}

export default InlineCode
