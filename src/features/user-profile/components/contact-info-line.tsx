import { type ComponentPropsWithoutRef } from 'react'

import merge from '@root/util/merge'

/**
 * The element for the {@link ContactInfoLine} component.
 */
const Element = 'span' as const

/**
 * Props for the {@link ContactInfoLine} component.
 */
type ContactInfoLineProps = ComponentPropsWithoutRef<typeof Element>

/**
 * The component for the contact info line.
 *
 * @props {@link ContactInfoLineProps}
 */
function ContactInfoLine({ children, className, ...props }: ContactInfoLineProps): JSX.Element {
  return (
    <Element {...props} className={merge('flex items-center gap-2', className)}>
      {children}
    </Element>
  )
}

export default ContactInfoLine
