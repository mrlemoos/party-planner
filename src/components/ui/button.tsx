import { type ButtonHTMLAttributes, forwardRef, Fragment } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { ReloadIcon } from '@radix-ui/react-icons'
import { cva, type VariantProps } from 'class-variance-authority'

import merge from '@root/util/merge'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>
type KeyofButtonVariants = keyof ButtonVariants

type HTMLButtonElementAttributes = ButtonHTMLAttributes<HTMLButtonElement>
type RememberedHTMLButtonElementAttributes = Omit<HTMLButtonElementAttributes, KeyofButtonVariants>

interface ButtonProps extends ButtonVariants, RememberedHTMLButtonElementAttributes {
  /**
   * If true, the props will be applied to child element inserted via the {@link children} instead of the root `button`
   * element which will not be rendered.
   *
   * @default false
   */
  asChild?: boolean
  /**
   * The boolean which determines whether or not the button is in a loading state. If true, the button will be disabled
   * and the {@link children} will be replaced with a loading icon.
   *
   * @default false
   */
  isLoading?: boolean
}

/**
 * The `Button` component is a wrapper around the `button` element that provides a set of variants and sizes to choose
 * from.
 *
 * @example
 * ```tsx
 * import Button from '@components/ui/button'
 *
 * function MyComponent(): JSX.Element {
 *   return (
 *     <Button variant="primary" size="md">
 *       Lorem ipsum
 *     </Button>
 *   )
 * }
 * ```

 * It also is possible to use the `Button` component as a wrapper around any element, in which case the props will be
 * applied to the child element instead of the root `button` element with the help of the `asChild` prop. For instance, 
 * the following example will render an anchor (also referred to `<a>` tag) element with the `Button` styles applied to 
 * it:
 *
 * @example
 * ```tsx
 *
 * import Button from '@components/ui/button'
 *
 * function MyComponent(): JSX.Element {
 * return (
 *  <Button asChild={true} variant="primary" size="md">
 *    <a href="https://example.com">Lorem ipsum</a>
 *  </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      asChild = false,
      isLoading = false,
      'aria-label': ariaLabel = isLoading ? 'Loading...' : undefined,
      ...props
    },
    ref,
  ) => {
    const RenderElement = (asChild ? Slot : 'button') as 'button'

    return (
      <RenderElement
        ref={ref}
        data-loading={isLoading}
        className={merge(
          buttonVariants({ variant, size, className }),
          'data-[loading=true]:pointer-events-none data-[loading=true]:select-none',
        )}
        aria-label={ariaLabel}
        {...props}
      >
        {isLoading ? (
          <Fragment>
            Loading...
            <ReloadIcon className='ml-2 h-4 w-4 animate-spin' aria-hidden='true' />
          </Fragment>
        ) : (
          children
        )}
      </RenderElement>
    )
  },
)

Button.displayName = 'Button'

export default Button
