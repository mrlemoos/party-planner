import { type ComponentProps } from 'react'

import classes from '@root/util/classes'

type LeadProps = ComponentProps<'p'>

function Lead({ children, className, ...props }: LeadProps): JSX.Element {
  return (
    <p className={classes('text-xl text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

export default Lead
