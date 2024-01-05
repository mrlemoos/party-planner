import { forwardRef, type ForwardRefExoticComponent, type HTMLAttributes } from 'react'

import DangerPanelIcon from './danger-panel-icon'

import merge from '@root/util/merge'

/**
 * The reference type forwarded to the {@link DangerPanel} root element.
 */
type DangerPanelReferenceType = HTMLDivElement

/**
 * The props for the {@link DangerPanel} component.
 */
type DangerPanelProps = HTMLAttributes<DangerPanelReferenceType>

/**
 * The component that renders a danger panel with a red background.
 *
 * @props {@link DangerPanelProps}
 * @ref {@link DangerPanelReferenceType}
 */
const DangerPanel = forwardRef<DangerPanelReferenceType, DangerPanelProps>(({ children, className, ...props }, ref) => (
  <div {...props} ref={ref} className={merge('rounded-lg border border-foreground/30 bg-rose-500/30 p-3', className)}>
    {children}
  </div>
)) as ForwardRefExoticComponent<DangerPanelProps> & { displayName: 'DangerPanel'; Icon: typeof DangerPanelIcon }
DangerPanel.displayName = 'DangerPanel'

DangerPanel.Icon = DangerPanelIcon

export default DangerPanel
