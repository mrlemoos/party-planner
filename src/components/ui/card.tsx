import { type HTMLAttributes, type ReactNode } from 'react'

import classes from '@root/util/classes'

import CardContent from './card-content'
import CardDescription from './card-description'
import CardFooter from './card-footer'
import CardHeader from './card-header'
import CardTitle from './card-title'

type $$HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>

interface CardProps extends $$HTMLDivElementAttributes {
  /**
   * The children which is required to render the elements of the `Card` component.
   */
  children: ReactNode
}
/**
 * Exception which is thrown when the {@link CardProps.children children} are not passed to the <Card /> component.
 */
class CardChildrenNotProvidedException extends Error {
  constructor() {
    super('The children are not provided to the <Card /> component.')
  }
}
/**
 * The `Card` component is a container component that is used to group related information. It is composed of several
 * sub-components that can be used to create a consistent layout.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>
 *     <p>Card content</p>
 *   </Card.Content>
 *   <Card.Footer>
 *     <Button>Button</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 *
 * @props {@link CardProps}
 */
function Card({ children, className, ...props }: CardProps): JSX.Element {
  if (!children) {
    throw new CardChildrenNotProvidedException()
  }
  return (
    <div className={classes('rounded-xl border bg-card text-card-foreground shadow', className)} {...props}>
      {children}
    </div>
  )
}

Card.Content = CardContent as typeof CardContent & { displayName: 'Card.Content' }
Card.Content.displayName = 'Card.Content'

Card.Description = CardDescription as typeof CardDescription & { displayName: 'Card.Description' }
Card.Description.displayName = 'Card.Description'

Card.Footer = CardFooter as typeof CardFooter & { displayName: 'Card.Footer' }
Card.Footer.displayName = 'Card.Footer'

Card.Header = CardHeader as typeof CardHeader & { displayName: 'Card.Header' }
Card.Header.displayName = 'Card.Header'

Card.Title = CardTitle as typeof CardTitle & { displayName: 'Card.Title' }
Card.Title.displayName = 'Card.Title'

export default Card
