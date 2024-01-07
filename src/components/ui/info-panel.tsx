import { forwardRef, type ForwardRefExoticComponent, type HTMLAttributes } from 'react'

import merge from '@root/util/merge'

import InfoPanelIcon from './info-panel-icon'

/**
 * The reference type forwarded to the {@link InfoPanel} root element.
 */
type InfoPanelReferenceType = HTMLDivElement

/**
 * The props for the {@link InfoPanel} component.
 */
type InfoPanelProps = HTMLAttributes<InfoPanelReferenceType>

/**
 * The component that renders an info panel with a red background.
 *
 * @props {@link InfoPanelProps}
 * @ref {@link InfoPanelReferenceType}
 */
const InfoPanel = forwardRef<InfoPanelReferenceType, InfoPanelProps>(({ children, className, ...props }, ref) => (
  <div {...props} ref={ref} className={merge('rounded-lg border border-foreground/30 bg-sky-500/30 p-3', className)}>
    {children}
  </div>
)) as ForwardRefExoticComponent<InfoPanelProps> & { displayName: 'InfoPanel'; Icon: typeof InfoPanelIcon }
InfoPanel.displayName = 'InfoPanel'

InfoPanel.Icon = InfoPanelIcon

export default InfoPanel
