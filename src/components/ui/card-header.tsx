import { type HTMLAttributes, type ReactNode } from 'react'

import classes from '@root/util/classes'

type $$HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>

interface CardHeaderProps extends $$HTMLDivElementAttributes {
  /**
   * The children which is required to render the elements of the `Card.Header` component.
   */
  children: ReactNode
}
/**
 * Exception which is thrown when the {@link CardHeaderProps.children children} are not passed to the <Card.Header />
 * component.
 */
class CardHeaderChildrenNotProvidedException extends Error {
  constructor() {
    super('The children are not provided to the <Card.Footer /> component.')
  }
}
/**
 * The `Card.Header` component is used to display a header in a `Card` component.
 */
function CardHeader({ children, className, ...props }: CardHeaderProps): JSX.Element {
  if (!children) {
    throw new CardHeaderChildrenNotProvidedException()
  }
  return (
    <div className={classes('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  )
}

export default CardHeader
