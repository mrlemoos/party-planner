'use client'

import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ElementRef,
  type ReactElement,
} from 'react'

import {
  Arrow as PrimitiveArrow,
  Content as PrimitiveContent,
  Provider as PrimitiveProvider,
  Root as PrimitiveRoot,
  Trigger as PrimitiveTrigger,
} from '@radix-ui/react-tooltip'

import TooltipOpenStateUpdateEvent from '@root/events/tooltip-open-state-update-event'
import isReactComponent from '@root/util/is-react-component'
import merge from '@root/util/merge'

import TooltipContentContainer from './tooltip-content-container'

/**
 * The props for the {@link TooltipContentChild} component.
 */
interface TooltipContentChildProps {
  /**
   * The {@link ReactElement | element} to render as the {@link Tooltip} content. It can be a
   * {@link ComponentType | component} or a `string` literal.
   */
  content: ReactElement | ComponentType | string
}

/**
 * The {@link ReactElement | element} to render as the {@link Tooltip} content. It can be a
 * {@link ComponentType | component} or a `string` literal.
 *
 * @see {@link ReactElement}
 * @see https://reactjs.org/docs/react-api.html#reactchildren
 * @see https://www.radix-ui.com/primitives/docs/components/tooltip
 * @see https://www.radix-ui.com/primitives/docs/components/tooltip#props
 * @see {@link TooltipProps.content}
 */
function TooltipContentChild({ content }: TooltipContentChildProps): JSX.Element {
  if (isReactComponent(content)) {
    const Component = content
    return <Component />
  }
  if (typeof content === 'string') {
    return <span>{content}</span>
  }
  return content
}

/**
 * The {@link ElementRef | element} to the {@link TooltipProvider} component.
 */
type TooltipRef = ElementRef<typeof PrimitiveContent>
/**
 * The props for the Primitive {@link PrimitiveContent | content} component from
 * {@link https://www.radix-ui.com/primitives/docs/components/tooltip | @radix-ui/react-tooltip}.
 */
type PrimitiveContentProps = ComponentPropsWithoutRef<typeof PrimitiveContent>
/**
 * The (picked) props for the Primitive {@link PrimitiveContent | content} component from
 * {@link https://www.radix-ui.com/primitives/docs/components/tooltip | @radix-ui/react-tooltip}.
 */
type ExcludedPrimitiveContentProps = Omit<
  PrimitiveContentProps,
  'children' | 'content' | 'side' | 'sideOffset' | 'align' | 'alignOffset'
>
/**
 * The props for the {@link TooltipContentContainer} component.
 */
type TooltipContentContainerProps = ComponentPropsWithoutRef<typeof TooltipContentContainer>
/**
 * The (picked) props for the {@link TooltipContentContainer} component.
 */
type PickedTooltipContentContainerProps = Partial<Pick<TooltipContentContainerProps, 'isPortal' | 'rootPortalElement'>>
/**
 * The {@link ComponentPropsWithoutRef | props} for the {@link Tooltip} component.
 */
interface TooltipProps
  extends /* NOTE: Interface of Radix's <Tooltip.Content /> */ ExcludedPrimitiveContentProps,
    TooltipContentChildProps,
    PickedTooltipContentContainerProps {
  /**
   * Boolean that indicates whether or not the {@link Tooltip} should render an arrow.
   *
   * @default false
   */
  hasArrow?: boolean
  /**
   * The custom {@link ReactElement | element} to which the tooltip content will be anchored at the moment of rendering.
   *
   * @see {@link ReactElement}
   * @see https://reactjs.org/docs/react-api.html#reactchildren
   * @see https://www.radix-ui.com/primitives/docs/components/tooltip
   */
  children: ReactElement
  /**
   * The {@link TooltipOpenStateUpdateEvent | event} handler that is called when the {@link Tooltip} open state changes.
   */
  onOpenStateUpdate?: (event: TooltipOpenStateUpdateEvent) => void
  /**
   * (Optional) boolean value that indicates whether or not the {@link Tooltip} should be rendered open by default.
   */
  isOpen?: boolean
  /**
   * The boolean that indicates whether or not the {@link Tooltip} should be rendered open by default.
   */
  isDefaultOpen?: boolean
  /**
   * The number of milliseconds to wait before the {@link Tooltip} is rendered open.
   *
   * @default 700
   */
  delayDuration?: number
  /**
   * Boolean that indicates whether or not the {@link Tooltip} should skip the delay duration.
   *
   * @default false
   */
  skipDelayDuration?: boolean
  /**
   * The number of pixels to offset the {@link Tooltip} from the anchor element.
   */
  sideOffset?: number
  /**
   * The side of the anchor element to which the {@link Tooltip} should be anchored.
   */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * The number of pixels to offset the {@link Tooltip} from the anchor element.
   */
  alignOffset?: number
  /**
   * The alignment of the {@link Tooltip} relative to the anchor element.
   */
  align?: 'start' | 'center' | 'end'
  /**
   * Boolean that indicates whether or not the hoverable content should be disabled.
   *
   * @default false
   */
  disableHoverableContent?: boolean
  /**
   * The {@link ReactElement | element} to render as the {@link Tooltip} content. It can be a
   * {@link ComponentType | component} or a `string` literal.
   */
  content: ReactElement | ComponentType | string
}

/**
 * The {@link Tooltip} component.
 *
 * @props {@link TooltipProps}
 * @ref {@link TooltipRef}
 */
const Tooltip = forwardRef<TooltipRef, TooltipProps>(
  (
    {
      children,
      className,
      content,
      sideOffset = 4,
      side,
      alignOffset,
      align,
      isPortal,
      rootPortalElement,
      hasArrow = true,
      isOpen,
      isDefaultOpen,
      delayDuration = 700,
      disableHoverableContent = false,
      skipDelayDuration = false,
      onOpenStateUpdate,
      ...props
    },
    ref,
  ) => {
    const handleOpenChange = useCallback(
      (isOpen: boolean) => {
        if (typeof onOpenStateUpdate === 'function') {
          const event = new TooltipOpenStateUpdateEvent(
            isOpen,
            children,
            hasArrow,
            disableHoverableContent,
            delayDuration,
            isDefaultOpen,
            skipDelayDuration,
          )
          onOpenStateUpdate(event)
        }
      },
      [children, delayDuration, disableHoverableContent, hasArrow, isDefaultOpen, onOpenStateUpdate, skipDelayDuration],
    )

    return (
      <PrimitiveProvider>
        <PrimitiveRoot
          defaultOpen={isDefaultOpen}
          delayDuration={delayDuration}
          disableHoverableContent={disableHoverableContent}
          open={isOpen}
          onOpenChange={handleOpenChange}
        >
          <PrimitiveTrigger asChild={true}>{children}</PrimitiveTrigger>
          <TooltipContentContainer rootPortalElement={rootPortalElement} isPortal={isPortal}>
            <PrimitiveContent
              ref={ref}
              side={side}
              sideOffset={sideOffset}
              align={align}
              alignOffset={alignOffset}
              className={merge(
                'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className,
              )}
              {...props}
            >
              <TooltipContentChild content={content} />
              {hasArrow && <PrimitiveArrow className='text-foreground' />}
            </PrimitiveContent>
          </TooltipContentContainer>
        </PrimitiveRoot>
      </PrimitiveProvider>
    )
  },
)
Tooltip.displayName = 'Tooltip'

export default Tooltip
