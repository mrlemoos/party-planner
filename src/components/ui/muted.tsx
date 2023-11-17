import { type ComponentProps } from 'react'

import classes from '@root/util/classes'

type MutedProps = ComponentProps<'p'>

function Muted({ children, className, ...props }: MutedProps): JSX.Element {
  return (
    <p className={classes('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

export default Muted
