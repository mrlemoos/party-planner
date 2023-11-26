import { AnchorHTMLAttributes, ReactNode, type ComponentPropsWithoutRef } from 'react'

import Link, { LinkProps } from 'next/link'

import merge from '@root/util/merge'

import Button from './button'
import FloatingHeader from './floating-header'
import Logo from './logo'

/**
 * The props for the `<TopBar.Button />` component.
 */
type TopBarButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, 'asChild' | 'variant'> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> &
  Pick<LinkProps, 'href'>

/**
 * The `<TopBar.Button />` component is a button that is used in the `<TopBar />` component.
 *
 * @props {@link TopBarButtonProps}
 */
function TopBarButton({ children, className, href, target, rel, ...props }: TopBarButtonProps): JSX.Element {
  return (
    <Button {...props} className={className} variant='ghost' asChild={true}>
      <Link href={href} target={target} rel={rel}>
        {children}
      </Link>
    </Button>
  )
}

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
      <Link href='/' className='w-[158px]'>
        <Logo />
      </Link>
      <FloatingHeader.NavigationMenu>{children}</FloatingHeader.NavigationMenu>
      {rightSide}
    </FloatingHeader>
  )
}

TopBar.Button = TopBarButton as typeof TopBarButton & { displayName: 'TopBar.Button' }
TopBar.Button.displayName = 'TopBar.Button'

export default TopBar
