import { type HTMLAttributes, type ReactNode } from 'react'

import classes from '@root/util/classes'

type $$HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>

interface CardContentProps extends $$HTMLDivElementAttributes {
  /**
   * The children which is required to render the elements of the `Card.Content` component.
   */
  children: ReactNode
}
/**
 * Exception which is thrown when the {@link CardContentProps.children children} are not passed to the <Card.Footer />
 * component.
 */
class CardContentChildrenNotProvidedException extends Error {
  constructor() {
    super('The children are not provided to the <Card.Footer /> component.')
  }
}
/**
 * The `Card.Content` component is used to display the content/body in a `Card` component.
 */
function CardContent({ children, className, ...props }: CardContentProps): JSX.Element {
  if (!children) {
    throw new CardContentChildrenNotProvidedException()
  }
  return (
    <div className={classes('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export default CardContent
