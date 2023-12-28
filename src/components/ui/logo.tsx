import FontLogo from '@root/styles/fonts/font-logo'
import merge from '@root/util/merge'

interface LogoProps {
  /**
   * The class name that is merged with the default class name at the root element.
   */
  className?: string
}

/**
 * The logo of the application.
 *
 * @props {@link LogoProps}
 */
function Logo({ className }: LogoProps): JSX.Element {
  return (
    <div
      className={merge(
        'flex h-7 w-7 items-center justify-center rounded-lg bg-foreground font-semibold text-background',
        FontLogo.className,
        className,
      )}
      aria-label='Planria'
    >
      <span>P</span>
    </div>
  )
}

export default Logo
