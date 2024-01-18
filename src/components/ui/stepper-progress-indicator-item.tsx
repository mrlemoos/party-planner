import { type ReactNode } from 'react'

interface StepperProgressIndicatorItemProps {
  /**
   * The content to be rendered inside the item.
   */
  children: ReactNode
  /**
   * The boolean which indicates whether or not this item is the last in a list.
   */
  isLast: boolean
  /**
   * The boolean which indicates whether or not this item is the one currently focused.
   */
  isFocused: boolean
}

/**
 * The component that composes the items of the progress indicator of the stepper.
 *
 * @props {@link StepperProgressIndicatorItemProps}
 */
function StepperProgressIndicatorItem({ children, isFocused, isLast }: StepperProgressIndicatorItemProps): JSX.Element {
  return (
    <li className='flex items-center gap-1'>
      <span
        className='bg-transparent text-sm font-normal text-foreground/50 data-[focused=true]:font-semibold data-[focused=true]:text-foreground'
        data-focused={isFocused}
      >
        {children}
      </span>
      {!isLast && (
        <div
          aria-hidden='true'
          data-focused={isFocused}
          className='ml-1 flex h-1 w-1 items-center rounded-full bg-gray-500 data-[focused=true]:bg-gradient-to-r data-[focused=true]:from-purple-500 data-[focused=true]:to-indigo-500'
        />
      )}
    </li>
  )
}
StepperProgressIndicatorItem.displayName = 'Stepper.ProgressIndicatorItem'

export default StepperProgressIndicatorItem
