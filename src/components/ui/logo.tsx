import { type ComponentPropsWithoutRef } from 'react'

import merge from '@root/util/merge'

/**
 * The element of the {@link Logo} component.
 */
const Element = 'span' as const

class LogoChildrenDefinedException extends Error {
  constructor() {
    super('The children of the Logo component must not be defined.')
  }
}

/**
 * The props for the {@link Logo} component.
 */
type LogoProps = ComponentPropsWithoutRef<typeof Element> & { children?: never }

/**
 * The logo of the application.
 *
 * @props {@link LogoProps}
 */
function Logo({ children, className, ...props }: LogoProps): JSX.Element {
  if (children) {
    throw new LogoChildrenDefinedException()
  }

  return (
    <Element {...props} className={merge('rounded-full bg-purple-300 p-2 text-lg dark:bg-purple-950', className)}>
      🎉
    </Element>
  )
}

export default Logo
