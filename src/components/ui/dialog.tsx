'use client'

import {
  Fragment,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactElement,
} from 'react'

import {
  Close as PrimitiveClose,
  Content as PrimitiveContent,
  Description as PrimitiveDescription,
  Portal as PrimitivePortal,
  Root as PrimitiveRoot,
  Title as PrimitiveTitle,
  Trigger as PrimitiveTrigger,
} from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import merge from '@root/util/merge'

import Button from './button'

/**
 * The props for the {@link DialogTrigger | trigger component}.
 */
type DialogTriggerProps = Omit<ComponentPropsWithoutRef<typeof PrimitiveTrigger>, 'asChild'>
/**
 * The ref type of the {@link DialogTrigger | trigger ref} element.
 */
type DialogTriggerRef = ComponentRef<typeof PrimitiveTrigger>
/**
 * The component that indicates the element that opens the dialog when its child is clicked.
 *
 * @props {@link DialogTriggerProps}
 * @ref {@link DialogTriggerRef}
 */
const DialogTrigger = forwardRef<DialogTriggerRef, DialogTriggerProps>(({ children, className, ...props }, ref) => (
  <PrimitiveTrigger
    ref={ref}
    asChild={true}
    className={merge('data-[state=open]:animate-pulse', 'data-[state=closed]:animate-none', className)}
    {...props}
  >
    {children}
  </PrimitiveTrigger>
))
DialogTrigger.displayName = 'Dialog.Trigger'

/**
 * The props for the {@link Dialog | dialog component}.
 */
type DialogContentProps = ComponentPropsWithoutRef<typeof PrimitiveContent>
/**
 * The ref type of the {@link Dialog | dialog ref} element.
 */
type DialogContentRef = ComponentRef<typeof PrimitiveContent>
/**
 * The component that wraps all dialog components. It provides a blur effect to the background.
 *
 * @props {@link DialogContentProps}
 * @ref {@link DialogContentRef}
 */
const DialogContent = forwardRef<DialogContentRef, DialogContentProps>(({ children, className, ...props }, ref) => (
  <PrimitiveContent
    ref={ref}
    className={merge(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
      'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      'sm:rounded-2xl',
      className,
    )}
    {...props}
  >
    {children}
  </PrimitiveContent>
))
DialogContent.displayName = 'Dialog.Content'

/**
 * The props for the {@link DialogHeader | dialog header component}.
 */
type DialogHeaderProps = HTMLAttributes<HTMLDivElement>
/**
 * The ref type of the {@link DialogHeader | dialog header ref} element.
 */
type DialogHeaderRef = HTMLDivElement
/**
 * The component that wraps all dialog components. It provides a blur effect to the background.
 *
 * @props {@link DialogHeaderProps}
 * @ref {@link DialogHeaderRef}
 */
const DialogHeader = forwardRef<DialogHeaderRef, DialogHeaderProps>(({ children, className, ...props }, ref) => (
  <div {...props} className={merge('flex flex-col space-y-1.5 text-center sm:text-left', className)} ref={ref}>
    {children}
  </div>
))
DialogHeader.displayName = 'Dialog.Header'

/**
 * The props for the {@link DialogFooter | dialog footer component}.
 */
type DialogFooterProps = HTMLAttributes<HTMLHeadingElement>
/**
 * The ref type of the {@link DialogFooter | dialog footer ref} element.
 */
type DialogFooterRef = HTMLHeadingElement
/**
 * The component that holds the call-to-action buttons of the dialog.
 *
 * @props {@link DialogFooterProps}
 * @ref {@link DialogFooterRef}
 */
const DialogFooter = forwardRef<DialogFooterRef, DialogFooterProps>(({ className, children, ...props }, ref) => (
  <div
    className={merge('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
    ref={ref}
  >
    {children}
  </div>
))
DialogFooter.displayName = 'Dialog.Footer'

/**
 * The props for the {@link DialogTitle | dialog title component}.
 */
type DialogTitleProps = ComponentPropsWithoutRef<typeof PrimitiveTitle>
/**
 * The ref type of the {@link DialogTitle | dialog title ref} element.
 */
type DialogTitleRef = ElementRef<typeof PrimitiveTitle>
/**
 * The component that holds the title of the dialog.
 *
 * @props {@link DialogTitleProps}
 * @ref {@link DialogTitleRef}
 */
const DialogTitle = forwardRef<DialogTitleRef, DialogTitleProps>(({ className, children, ...props }, ref) => (
  <PrimitiveTitle
    ref={ref}
    className={merge('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  >
    {children}
  </PrimitiveTitle>
))
DialogTitle.displayName = 'Dialog.Title'

/**
 * The props for the {@link DialogDescription | dialog description component}.
 */
type DialogDescriptionProps = ComponentPropsWithoutRef<typeof PrimitiveTitle>
/**
 * The ref type of the {@link DialogDescription | dialog description ref} element.
 */
type DialogDescriptionRef = ElementRef<typeof PrimitiveTitle>
/**
 * The component that holds the description of the dialog.
 */
const DialogDescription = forwardRef<DialogDescriptionRef, DialogDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <PrimitiveDescription ref={ref} className={merge('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </PrimitiveDescription>
  ),
)
DialogDescription.displayName = 'Dialog.Description'

/**
 * Props for the {@link DialogCloseButton} component.
 */
type DialogCloseButtonProps = Omit<ComponentPropsWithoutRef<typeof PrimitiveClose>, 'asChild'>
/**
 * Ref type for the {@link DialogCloseButton} component.
 */
type DialogCloseButtonRef = ComponentRef<typeof PrimitiveClose>
/**
 * The component that indicates the element that closes the dialog when its child is clicked. Please notice that this
 * component does not have any styles, so you need to style it yourself or wrap your styled component or element with
 * this component.
 *
 * @props {@link DialogCloseButtonProps}
 */
const DialogCloseButton = forwardRef<DialogCloseButtonRef, DialogCloseButtonProps>(
  ({ children, className, ...props }, ref) => (
    <PrimitiveClose ref={ref} {...props} asChild={true} className={className}>
      {children ?? (
        <Button size='icon' variant='ghost' className='absolute right-3 top-3'>
          <Cross2Icon aria-label='Close' height={20} width={20} className='text-gray-500' />
        </Button>
      )}
    </PrimitiveClose>
  ),
)
DialogCloseButton.displayName = 'Dialog.CloseButton'

/**
 * The props for the {@link DialogOverlay | dialog component}.
 */
type DialogOverlayProps = Omit<ComponentPropsWithoutRef<typeof DialogCloseButton>, 'children' | 'aria-hidden'>
/**
 * The ref type of the {@link DialogOverlay | overlay ref} element.
 */
type DialogOverlayRef = ComponentRef<typeof DialogCloseButton>
/**
 * The component that wraps all dialog components. It provides a blur effect to the background.
 *
 * @props {@link DialogOverlayProps}
 * @ref {@link DialogOverlayRef}
 */
const DialogOverlay = forwardRef<DialogOverlayRef, DialogOverlayProps>(({ className, ...props }, ref) => (
  <DialogCloseButton
    aria-hidden='true'
    className={merge(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-lg',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className,
    )}
    ref={ref}
    {...props}
  />
))
DialogOverlay.displayName = 'Dialog.Overlay'

/**
 * The event that is triggered when the open state of the dialog changes, *i.e.*, when the dialog is opened or closed.
 */
class DialogOpenStateChangeEvent {
  constructor(
    /**
     * The boolean that indicates whether or not the dialog is open.
     */
    public readonly isOpen: boolean,
    /**
     * The boolean that indicates if the dialog is a portal.
     */
    public readonly isPortal: boolean,
    /**
     * The trigger element provided via the {@link DialogProps.trigger | `trigger` prop} of the
     * {@link Dialog | dialog component}. If not provided, it will be `null`.
     */
    public readonly trigger: ReactElement | null,
  ) {}
}
/**
 * The handler for the {@link DialogOpenStateChangeEvent} class that is triggered when the open state of the dialog
 * changes, *i.e.*, when the dialog is opened or closed.
 */
interface DialogOpenStateChangeEventHandler {
  (event: DialogOpenStateChangeEvent): void
}
/**
 * The props for the {@link DialogProps | dialog component}.
 */
interface DialogProps
  extends Pick<ComponentPropsWithoutRef<typeof PrimitiveRoot>, 'modal' | 'defaultOpen'>,
    HTMLAttributes<HTMLDivElement> {
  /**
   * The boolean that indicates whether or not the dialog is open.
   */
  isOpen?: boolean
  /**
   * The boolean that indicates if the dialog is a portal.
   *
   * @default false
   */
  isPortal?: boolean
  /**
   * The trigger that opens the dialog.
   *
   * The trigger is used for wrapping the element that opens the dialog.
   *
   * @see {@link DialogTrigger}
   * @see {@link ReactElement}
   */
  trigger?: ReactElement
  /**
   * The {@link DialogOpenStateChangeEventHandler | event handler} that is triggered when the open state of the
   * dialog changes, *i.e.*, when the dialog is opened or closed.
   *
   * @see {@link DialogOpenStateChangeEvent}
   * @see {@link DialogOpenStateChangeEventHandler}
   */
  onOpenChange?: DialogOpenStateChangeEventHandler
  /**
   * The {@link DialogOpenStateChangeEventHandler | event handler} that is triggered when the dialog closes.
   *
   * @see {@link DialogOpenStateChangeEvent}
   * @see {@link DialogOpenStateChangeEventHandler}
   */
  onClose?: DialogOpenStateChangeEventHandler
}
/**
 * The ref type of the {@link Dialog | dialog ref} element.
 */
type DialogRef = ComponentRef<typeof PrimitiveRoot>
/**
 * The component that wraps all dialog components. It provides a blur effect to the background.
 *
 * @example
 * ```tsx
 *
 * <Dialog>
 *   <Dialog.Header>
 *    <Dialog.Title>Dialog Title</Dialog.Title>
 *  </Dialog.Header>
 *   <Dialog.Description>Dialog Description</Dialog.Description>
 * </Dialog>
 * ```
 */
const DialogComposition = forwardRef<DialogRef, DialogProps>(
  (
    {
      children,
      className,
      isPortal = false,
      trigger,
      modal = false,
      isOpen,
      defaultOpen,
      onOpenChange,
      onClose,
      ...props
    },
    ref,
  ) => {
    const hasTrigger = useMemo(() => isValidElement(trigger), [trigger])

    const DialogContainer = isPortal ? PrimitivePortal : Fragment

    const handleOpenChange = useCallback(
      (isDialogNowOpen: boolean) => {
        const nullishTrigger = trigger ?? null
        const event = new DialogOpenStateChangeEvent(isDialogNowOpen, isPortal, nullishTrigger)

        if (typeof onOpenChange === 'function') {
          onOpenChange(event)
        }
        if (typeof onClose === 'function' && !isDialogNowOpen) {
          onClose(event)
        }
      },
      [isPortal, onOpenChange, trigger, onClose],
    )

    return (
      <PrimitiveRoot modal={modal} open={isOpen} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
        {hasTrigger && <DialogTrigger>{trigger}</DialogTrigger>}
        <DialogOverlay />
        <DialogContainer>
          <DialogContent {...props} className={className} ref={ref}>
            {children}
          </DialogContent>
        </DialogContainer>
      </PrimitiveRoot>
    )
  },
)
DialogComposition.displayName = 'Dialog'

const Dialog = DialogComposition as typeof DialogComposition & {
  Header: typeof DialogHeader
  Footer: typeof DialogFooter
  Title: typeof DialogTitle
  Description: typeof DialogDescription
  CloseButton: typeof DialogCloseButton
}

Dialog.Header = DialogHeader
Dialog.Footer = DialogFooter
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription
Dialog.CloseButton = DialogCloseButton

export default Dialog
