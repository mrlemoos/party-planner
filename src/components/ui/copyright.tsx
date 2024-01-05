import { type ComponentPropsWithoutRef } from 'react'

import ComponentPropNotAllowedException from '@root/exceptions/component-prop-not-allowed-exception'
import merge from '@root/util/merge'

/**
 * The number type of the current year applied to a constant (e.g. `2023`).
 */
const CURRENT_FULL_YEAR = new Date().getFullYear()

/**
 * The React-adapted attributes of the HTML `<span>` element.
 */
type HTMLSpanElementAttributes = ComponentPropsWithoutRef<'span'>

/**
 * The type that omits the `children` property from the {@link HTMLSpanElementAttributes} type.
 */
type RememberedHTMLSpanElementAttributes = Omit<HTMLSpanElementAttributes, 'children'>

/**
 * The interface that maps the properties of the {@link Copyright} component.
 */
interface CopyrightProps extends RememberedHTMLSpanElementAttributes {
  /**
   * @ignore
   */
  children?: never
}

/**
 * The component that renders the copyright statement of Planria. This small component is firstly designed to be
 * compounded into the footer of the application, however, it may be fit for other purposes.
 *
 * Also, this component throws an {@link ComponentPropNotAllowedException | exception} if the
 * {@link CopyrightProps.children | children} is defined.
 *
 * @props {@link CopyrightProps}
 */
function Copyright({ children, className, ...props }: CopyrightProps): JSX.Element {
  if (typeof children !== 'undefined') {
    throw new ComponentPropNotAllowedException('Copyright', 'children')
  }

  return (
    <span {...props} className={merge('text-foreground/80', className)}>
      Copyright &copy; Planria {CURRENT_FULL_YEAR}. All rights reserved.
    </span>
  )
}

export default Copyright
