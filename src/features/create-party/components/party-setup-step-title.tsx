import { type ReactNode } from 'react'

import merge from '@root/util/merge'

interface PartySetupStepTitleProps {
  /**
   * The step actual label or title.
   */
  children: ReactNode
  /**
   * Boolean that indicates if the step is the one currently focused or not.
   */
  isInFormFocus: boolean
}

/**
 * The component that renders the title of the step.
 *
 * @props {@link PartySetupStepTitleProps}
 */
function PartySetupStepTitle({ children, isInFormFocus }: PartySetupStepTitleProps): JSX.Element {
  return (
    <h2
      className={merge(
        'bg-transparent text-lg',
        isInFormFocus ? 'font-medium text-foreground' : 'font-normal text-foreground/50',
      )}
    >
      {children}
    </h2>
  )
}

export default PartySetupStepTitle
