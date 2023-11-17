import { type HTMLAttributes, type ReactNode } from 'react'

import classes from '@root/util/classes'

type $$HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>

interface CardFooterProps extends $$HTMLDivElementAttributes {
  /**
   * The children which is required to render the elements of the `Card.Footer` component.
   */
  children: ReactNode
}

/**
 * Exception which is thrown when the {@link CardFooterProps.children children} are not passed to the <Card.Footer />
 * component.
 */
class CardFooterChildrenNotProvidedException extends Error {
  constructor() {
    super('The children are not provided to the <Card.Footer /> component.')
  }
}

/**
 * The `Card.Footer` component is used to display a footer in a `Card` component.
 *
 * @props {@link CardFooterProps}
 */
function CardFooter({ children, className, ...props }: CardFooterProps): JSX.Element {
  if (!children) {
    throw new CardFooterChildrenNotProvidedException()
  }
  return (
    <div className={classes('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export default CardFooter
