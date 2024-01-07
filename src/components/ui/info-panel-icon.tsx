import { InfoCircledIcon } from '@radix-ui/react-icons'

interface InfoPanelIconProps {
  /**
   * The size of the icon.
   */
  size: number
}

/**
 * The component that renders a danger panel icon, which is an exclamation triangle highlighted in red.
 *
 * @props {@link InfoPanelIconProps}
 */
function InfoPanelIcon({ size }: InfoPanelIconProps): JSX.Element {
  return (
    <div className='h-min w-min rounded-sm bg-sky-600 p-2' aria-hidden='true'>
      <InfoCircledIcon height={size} width={size} className='text-red-100' />
    </div>
  )
}
InfoPanelIcon.displayName = 'InfoPanel.Icon'

export default InfoPanelIcon
