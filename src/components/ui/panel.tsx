import { type ComponentPropsWithoutRef, type ComponentType, type HTMLAttributes, type SVGAttributes } from 'react'

import { CheckIcon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { VariantProps, cva } from 'class-variance-authority'

import merge from '@root/util/merge'

import Button from './button'

/**
 * The props for the `<Panel.Icon />` component.
 */
type PanelIconProps = Omit<SVGAttributes<SVGElement>, 'children' | 'height' | 'width'> & {
  /**
   * @ignore
   */
  children?: never
  /**
   * The size of the icon that is replicated to `height` and `width`.
   *
   * @default 32
   */
  size?: number
  /**
   * The icon to display.
   */
  Icon: ComponentType<Omit<SVGAttributes<SVGElement>, 'children'> & { children?: never; color?: string }>
}

/**
 * The component to render the icon inside the `<Panel />` component.
 */
function PanelIcon({ size = 32, Icon, className, ...props }: PanelIconProps): JSX.Element {
  return <Icon {...props} className={merge('ml-1 mr-3', className)} height={size} width={size} />
}

/**
 * Props for the {@link SuccessIcon} component.
 */
type SuccessIconProps = Omit<PanelIconProps, 'Icon'>

/**
 * The component that renders the `<CheckIcon />` inside the {@link PanelIcon | `<Panel.Icon />`} component.
 *
 * @props {@link SuccessIconProps}
 */
function SuccessIcon(props: SuccessIconProps): JSX.Element {
  return <PanelIcon {...props} Icon={CheckIcon} />
}

/**
 * Props for the {@link DangerIcon} component.
 */
type DangerIconProps = Omit<PanelIconProps, 'Icon'>
/**
 * The component that renders the `<ExclamationTriangleIcon />` inside the {@link PanelIcon | `<Panel.Icon />`}
 * component.
 *
 * @props {@link DangerIconProps}
 */
function DangerIcon(props: DangerIconProps): JSX.Element {
  return <PanelIcon {...props} Icon={ExclamationTriangleIcon} />
}

/**
 * Props for the {@link WarningIcon} component.
 */
type WarningIconProps = Omit<PanelIconProps, 'Icon'>

/**
 * The component that renders the `<ExclamationTriangleIcon />` inside the {@link PanelIcon | `<Panel.Icon />`}
 * component.
 *
 * @props {@link WarningIconProps}
 */
function WarningIcon(props: WarningIconProps): JSX.Element {
  return <PanelIcon {...props} Icon={ExclamationTriangleIcon} />
}

/**
 * Props for the {@link InfoIcon} component.
 */
type InfoIconProps = Omit<PanelIconProps, 'Icon'>
/**
 * The component that renders the `<ExclamationTriangleIcon />` inside the {@link PanelIcon | `<Panel.Icon />`}
 * component.
 *
 * @props {@link InfoIconProps}
 */
function InfoIcon(props: InfoIconProps): JSX.Element {
  return <PanelIcon {...props} Icon={InfoCircledIcon} />
}

/**
 * The props for the {@link PanelMessage} component.
 */
type PanelMessageProps = ComponentPropsWithoutRef<'p'>

/**
 * The component that renders the message inside the {@link Panel | `<Panel />`} component.
 */
function PanelMessage({ children, className, ...props }: PanelMessageProps): JSX.Element {
  return (
    <p {...props} className={merge({ className })}>
      {children}
    </p>
  )
}

/**
 * The props for the {@link PanelAction} component.
 */
type PanelActionProps = ComponentPropsWithoutRef<typeof Button>

/**
 * The component that renders the action button inside the {@link Panel | `<Panel />`} component.
 *
 * @props {@link PanelActionProps}
 */
function PanelAction({ children, variant = 'primary', className, ...props }: PanelActionProps): JSX.Element {
  return (
    <Button {...props} variant={variant} className={merge('ml-3 mr-1', className)}>
      {children}
    </Button>
  )
}

/**
 * The styles for the `<Panel />` component.
 */
const panelStyles = cva('flex items-center rounded-xl p-3', {
  variants: {
    variant: {
      success: 'bg-green-300 text-green-950 dark:bg-green-800 dark:text-green-100',
      warning: 'bg-yellow-200 text-yellow-950 dark:bg-yellow-800 dark:text-yellow-100',
      danger: 'bg-red-300 text-red-950 dark:bg-red-800 dark:text-red-100',
      info: 'bg-blue-300 text-blue-950 dark:bg-blue-800 dark:text-blue-100',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
})

/**
 * The {@link Panel} component that renders a panel with an icon and a message.
 */
type PanelProps = HTMLAttributes<HTMLElement> & VariantProps<typeof panelStyles>

/**
 * The component that renders a panel with an icon and a message.
 *
 * @example
 * ```tsx
 * <Panel variant='danger'>
 *   <Panel.DangerIcon />
 *   <Panel.Message>Thank you for your message. We will get back to you as soon as possible.</Panel.Message>
 * </Panel>
 * ```
 */
function Panel({ children, className, variant = 'success', ...props }: PanelProps): JSX.Element {
  return (
    <div {...props} className={merge('animate-fade-in font-medium', panelStyles({ className, variant }))}>
      {children}
    </div>
  )
}

Panel.Icon = PanelIcon as typeof PanelIcon & { displayName: 'Panel.Icon' }
Panel.Icon.displayName = 'Panel.Icon'

Panel.Message = PanelMessage as typeof PanelMessage & { displayName: 'Panel.Message' }
Panel.Message.displayName = 'Panel.Message'

Panel.SuccessIcon = SuccessIcon as typeof SuccessIcon & { displayName: 'Panel.SuccessIcon' }
Panel.SuccessIcon.displayName = 'Panel.SuccessIcon'

Panel.DangerIcon = DangerIcon as typeof DangerIcon & { displayName: 'Panel.DangerIcon' }
Panel.DangerIcon.displayName = 'Panel.DangerIcon'

Panel.WarningIcon = WarningIcon as typeof WarningIcon & { displayName: 'Panel.WarningIcon' }
Panel.WarningIcon.displayName = 'Panel.WarningIcon'

Panel.InfoIcon = InfoIcon as typeof InfoIcon & { displayName: 'Panel.InfoIcon' }
Panel.InfoIcon.displayName = 'Panel.InfoIcon'

Panel.Action = PanelAction as typeof PanelAction & { displayName: 'Panel.Action' }
Panel.Action.displayName = 'Panel.Action'

export default Panel
