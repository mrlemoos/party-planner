'use client'

import { type AnchorHTMLAttributes, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { motion, type TargetAndTransition } from 'framer-motion'
import Link from 'next/link'

import merge from '@root/util/merge'
import toRem from '@root/util/to-rem'

import Button from './button'
import FloatingHeader from './floating-header'
import Logo from './logo'

/**
 * The props for the `<TopBar.Button />` component.
 */
type HTMLAnchorElementAttributes = AnchorHTMLAttributes<HTMLAnchorElement>
/**
 * The React-adapted attributes for the `<anchor>` element picked from the {@link HTMLAnchorElementAttributes} type.
 */
type PickedHTMLAnchorElementAttributes = Pick<HTMLAnchorElementAttributes, 'target' | 'rel'>
/**
 * The props from {@link Button} component.
 */
type ButtonProps = ComponentPropsWithoutRef<typeof Button>
/**
 * The picked props from {@link ButtonProps} type.
 */
type PickedButtonProps = Pick<ButtonProps, 'asChild' | 'variant' | 'className'>

/**
 * The props for the `<TopBar.Button />` component.
 */
interface TopBarButtonProps extends PickedHTMLAnchorElementAttributes, PickedButtonProps {
  /**
   * The custom {@link ReactNode node} which will be displayed inside the button.
   */
  children: ReactNode
  /**
   * The hyperlink reference for the button.
   */
  href: string
}

/**
 * The `<TopBar.Button />` component is a button that is used in the `<TopBar />` component.
 *
 * @props {@link TopBarButtonProps}
 */
function TopBarButton({ children, className, href, target, rel, ...props }: TopBarButtonProps): JSX.Element {
  return (
    <Button {...props} className={className} variant='ghost' asChild={true}>
      <Link href={href as ComponentPropsWithoutRef<typeof Link>['href']} target={target} rel={rel}>
        {children}
      </Link>
    </Button>
  )
}

const keyframes = {
  productLogo: {
    whileHover: {
      width: toRem(40),

      transition: {
        duration: 0.5,
        type: 'spring',
      },
    },
  } as TargetAndTransition,
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

const AnimatedLogo = motion(Logo)

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
      <Link href='/'>
        <AnimatedLogo whileHover={keyframes.productLogo} />
      </Link>
      <FloatingHeader.NavigationMenu>{children}</FloatingHeader.NavigationMenu>
      {rightSide}
    </FloatingHeader>
  )
}

TopBar.Button = TopBarButton as typeof TopBarButton & { displayName: 'TopBar.Button' }
TopBar.Button.displayName = 'TopBar.Button'

export default TopBar
