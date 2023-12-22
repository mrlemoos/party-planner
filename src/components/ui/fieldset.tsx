import { type FieldsetHTMLAttributes, type ReactNode } from 'react'

import merge from '@root/util/merge'

type HTMLFieldsetAttributes = FieldsetHTMLAttributes<HTMLFieldSetElement>

/**
 * The props for the Fieldset component.
 */
interface FieldsetProps extends HTMLFieldsetAttributes {
  /**
   * The children of the Fieldset component.
   */
  children: ReactNode
}

/**
 * The Fieldset component.
 *
 * @props {@link FieldsetProps}
 */
function Fieldset({ children, className, ...props }: FieldsetProps): JSX.Element {
  return (
    <fieldset className={merge('flex w-full flex-col border-none bg-transparent', className)} {...props}>
      {children}
    </fieldset>
  )
}

export default Fieldset
