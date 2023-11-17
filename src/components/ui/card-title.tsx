'use client'

import { type HTMLAttributes, type ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'

import classes from '@root/util/classes'

type $$HTMLHeadingElementAttributes = HTMLAttributes<HTMLHeadingElement>

interface CardTitleProps extends $$HTMLHeadingElementAttributes {
  /**
   * The children which is required to render the elements of the `Card.Title` component.
   */
  children: ReactNode
  /**
   *  If `true`, the `Card.Title` will forward the props to the child root element and will not render a `h3` element,
   * leaving it up to the child to render the appropriate HTML element.
   *
   * @default false
   */
  asChild?: boolean
}
/**
 * Exception which is thrown when the {@link CardTitleProps.children children} are not passed to the `<Card.Title />`.
 */
class CardTitleChildrenNotProvidedException extends Error {
  constructor() {
    super('The children are not provided to the <Card.Title /> component.')
  }
}
/**
 * The `Card.Title` component is used to display a title in a `Card` component.
 */
function CardTitle({ children, className, asChild = false, ...props }: CardTitleProps): JSX.Element {
  if (!children) {
    throw new CardTitleChildrenNotProvidedException()
  }

  const Element = (asChild ? Slot : 'h3') as 'h3'

  return (
    <Element className={classes('font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </Element>
  )
}

export default CardTitle
