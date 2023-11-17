import { HTMLAttributes, type ComponentPropsWithoutRef } from 'react'

import merge from '@root/util/merge'

/**
 * The contract of the `<FloatingHeader.NavigationMenu />` component.
 *
 * @see {@link HTMLAttributes}
 */
type FloatingHeaderNavigationMenuProps = HTMLAttributes<HTMLElement>

/**
 * The floating header menu is a container for the elements inside the floating header.
 *
 * @example
 * ```tsx
 * <FloatingHeader>
 *   <FloatingHeader.NavigationMenu>
 *     <h1>My Header</h1>
 *   </FloatingHeader.NavigationMenu>
 * </FloatingHeader>
 * ```
 */
function FloatingHeaderNavigationMenu({
  className,
  children,
  ...props
}: FloatingHeaderNavigationMenuProps): JSX.Element {
  return (
    <div className={merge('flex items-center gap-5', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * The root element of the `<FloatingHeader />` component.
 */
const RootElement = 'header' as const

/**
 * The contract of the `<FloatingHeader />` component.
 *
 * @see {@link ComponentPropsWithoutRef}
 */
type FloatingHeaderProps = ComponentPropsWithoutRef<typeof RootElement>

/**
 * The floating header is a bar that sticks to the top of the screen.
 *
 * @example
 * ```tsx
 * <FloatingHeader>
 *  <h1>My Header</h1>
 * </FloatingHeader>
 * ```
 *
 * @props {@link FloatingHeaderProps}
 */
function FloatingHeader({ children, className, ...props }: FloatingHeaderProps): JSX.Element {
  return (
    <RootElement
      className={merge(
        'sticky top-6 mx-auto rounded-b-md border-gray-200 p-3 shadow-md backdrop-blur-lg dark:border-gray-700 md:max-w-[90vw] md:rounded-3xl md:border md:shadow-2xl xl:max-w-screen-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </RootElement>
  )
}

FloatingHeader.NavigationMenu = FloatingHeaderNavigationMenu as typeof FloatingHeaderNavigationMenu & {
  displayName: 'FloatingHeader.NavigationMenu'
}
FloatingHeader.NavigationMenu.displayName = 'FloatingHeader.NavigationMenu'

export default FloatingHeader
