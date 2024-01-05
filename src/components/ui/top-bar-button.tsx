import { type AnchorHTMLAttributes, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import Link from 'next/link'

import Button from './button'

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

export default TopBarButton
