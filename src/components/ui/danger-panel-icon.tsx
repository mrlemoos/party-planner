import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface DangerPanelIconProps {
  /**
   * The size of the icon.
   */
  size: number
}

/**
 * The component that renders a danger panel icon, which is an exclamation triangle highlighted in red.
 *
 * @props {@link DangerPanelIconProps}
 */
function DangerPanelIcon({ size }: DangerPanelIconProps): JSX.Element {
  return (
    <div className='h-min w-min rounded-sm bg-rose-600 p-2' aria-hidden='true'>
      <ExclamationTriangleIcon height={size} width={size} className='text-red-100' />
    </div>
  )
}
DangerPanelIcon.displayName = 'DangerPanel.Icon'

export default DangerPanelIcon
