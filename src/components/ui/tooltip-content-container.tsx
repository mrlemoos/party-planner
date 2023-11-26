import { Fragment, type ReactNode } from 'react'

import { Portal as PrimitivePortal } from '@radix-ui/react-tooltip'

/**
 * The props for the {@link TooltipContentContainer} component.
 */
interface TooltipContentContainerProps {
  /**
   * If the {@link isPortal} prop is set to `true`, the {@link ReactNode | children} will be rendered in a ReactDOM
   * portal. Otherwise, it will be rendered in the DOM tree. For the latter case is, for the React Virtual DOM, these
   * {@link ReactNode | children} will be wrapped in a {@link Fragment}.
   *
   * @ignore
   * @private
   */
  children: ReactNode
  /**
   * Boolean that enables the {@link Tooltip} to be rendered in a ReactDOM portal instead of the DOM tree. It is also
   * possible to define the {@link rootPortalElement} prop to specify the portal element, otherwise it will be rendered
   * in the {@link document.body}.
   *
   * @default false
   */
  isPortal?: boolean
  /**
   * The {@link HTMLElement | element} to render the {@link Tooltip} in a ReactDOM portal. If not defined, it will be
   * rendered in the {@link document.body}.
   */
  rootPortalElement?: HTMLElement
}

/**
 * The component that renders the {@link Tooltip} content in a ReactDOM portal or in the DOM tree.
 *
 * @props {@link TooltipContentContainerProps}
 */
function TooltipContentContainer({
  isPortal = false,
  rootPortalElement,
  children,
}: TooltipContentContainerProps): JSX.Element {
  if (isPortal) {
    return <PrimitivePortal container={rootPortalElement}>{children}</PrimitivePortal>
  }
  return <Fragment>{children}</Fragment>
}

export default TooltipContentContainer
