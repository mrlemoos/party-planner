import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

import merge from '@root/util/merge'

import FloatingHeader from './floating-header'
import TopBarButton from './top-bar-button'
import TopBarProductLogo from './top-bar-product-logo'

/**
 * The props for the `<TopBar />` component.
 */
interface TopBarProps extends ComponentPropsWithoutRef<typeof FloatingHeader> {
  /**
   * The custom {@link ReactNode node} which will be displayed on the right side of the top bar. Commonly used for
   * displaying the user's avatar and name.
   */
  rightSide?: ReactNode
}

/**
 * The `<TopBar />` component is a floating header that is always visible at the top of the page and sticks to the top
 * of the page when scrolling.
 *
 * @example
 *
 * ```tsx
 * <TopBar>
 *  <TopBar.Button href='/'>Home</TopBar.Button>
 * </TopBar>
 * ```
 *
 * @props {@link TopBarProps}
 */
function TopBar({ children, className, rightSide, ...props }: TopBarProps): JSX.Element {
  return (
    <FloatingHeader className={merge('z-10 flex items-center justify-between px-4', className)} {...props}>
      <TopBarProductLogo />
      <FloatingHeader.NavigationMenu>{children}</FloatingHeader.NavigationMenu>
      {rightSide}
    </FloatingHeader>
  )
}

TopBar.Button = TopBarButton as typeof TopBarButton & { displayName: 'TopBar.Button' }
TopBar.Button.displayName = 'TopBar.Button'

export default TopBar
