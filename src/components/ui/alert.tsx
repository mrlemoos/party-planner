import { type ComponentType, type HTMLAttributes, type SVGAttributes } from 'react'

import { BookmarkFilledIcon, CheckIcon, Cross2Icon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { cva, type VariantProps } from 'class-variance-authority'

import merge from '@root/util/merge'

import AlertDescription from './alert-description'
import AlertTitle from './alert-title'

/**
 * The root styles are used to style the alert component.
 */
const variantRootStyles = cva(
  'relative flex w-full items-center rounded-lg border border-foreground/30 bg-background px-4 py-3 text-sm text-foreground shadow-2xl [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        info: 'border-blue-300/30 dark:border-blue-900/50',
        custom: 'border-foreground/50',
        success: 'border-green-300/30 dark:border-green-900/50',
        warning: 'border-red--300/30 dark:border-red-900/50',
        danger: 'border-blue-300/30 dark:border-blue-900/50',
      },
    },
  },
)

/**
 * The variant indicator styles are used to display a coloured bar on the left side of the alert component, providing a
 * primary visual indicator of the alert's variant, hence, the degree of severity of the message.
 */
const variantIndicatorStyles = cva('w-2 h-full rounded-md mr-2', {
  variants: {
    variant: {
      info: 'bg-blue-500',
      custom: 'bg-foreground-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
    },
  },
})

/**
 * The recommended icon for the info variant is the {@link BookmarkFilledIcon | bookmark filled icon}.
 */
const InfoIcon = BookmarkFilledIcon as ComponentType<SVGAttributes<SVGSVGElement>>
/**
 * The recommended icon for the success variant is the {@link CheckIcon | check icon}.
 */
const SuccessIcon = CheckIcon as ComponentType<SVGAttributes<SVGSVGElement>>
/**
 * The recommended icon for the warning variant is the {@link ExclamationTriangleIcon | exclamation triangle icon}.
 */
const WarningIcon = ExclamationTriangleIcon as ComponentType<SVGAttributes<SVGSVGElement>>
/**
 * The recommended icon for the danger variant is the {@link Cross2Icon | cross icon}.
 */
const DangerIcon = Cross2Icon as ComponentType<SVGAttributes<SVGSVGElement>>

/**
 * The possible variants for the alert component.
 *
 * @see {@link variantIndicatorStyles}
 */
type AlertVariant = NonNullable<VariantProps<typeof variantIndicatorStyles>['variant']>

/**
 * Props for the alert component.
 */
interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert.
   *
   * @default 'info'
   */
  variant?: AlertVariant
}

/**
 * The alert component is used to display a message to the user.
 *
 * @props {@link AlertProps}
 */
function Alert({ className, children, variant = 'info', ...props }: AlertProps): JSX.Element {
  return (
    <div role='alert' className={merge(variantRootStyles({ variant, className }))} {...props}>
      <div className={merge(variantIndicatorStyles({ variant }))} aria-hidden='true' />
      <div className='grid grid-rows-2'>{children}</div>
    </div>
  )
}

Alert.Title = AlertTitle as typeof AlertTitle & { displayName: 'Alert.Title' }
Alert.Title.displayName = 'Alert.Title'

Alert.Description = AlertDescription as typeof AlertDescription & { displayName: 'Alert.Description' }
Alert.Description.displayName = 'Alert.Description'

Alert.InfoIcon = InfoIcon as typeof InfoIcon & { displayName: 'Alert.InfoIcon' }
Alert.InfoIcon.displayName = 'Alert.InfoIcon'

Alert.SuccessIcon = SuccessIcon as typeof SuccessIcon & { displayName: 'Alert.SuccessIcon' }
Alert.SuccessIcon.displayName = 'Alert.SuccessIcon'

Alert.DangerIcon = DangerIcon as typeof DangerIcon & { displayName: 'Alert.DangerIcon' }
Alert.DangerIcon.displayName = 'Alert.DangerIcon'

Alert.WarningIcon = WarningIcon as typeof WarningIcon & { displayName: 'Alert.WarningIcon' }
Alert.WarningIcon.displayName = 'Alert.WarningIcon'

export default Alert
