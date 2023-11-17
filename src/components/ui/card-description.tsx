import { type HTMLAttributes } from 'react'

import classes from '@root/util/classes'

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

function CardDescription({ children, className, ...props }: CardDescriptionProps): JSX.Element {
  return (
    <p className={classes('text-md text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

export default CardDescription
