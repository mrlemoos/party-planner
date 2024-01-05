'use client'

import { forwardRef } from 'react'

import FontLogo from '@root/styles/fonts/font-logo'
import merge from '@root/util/merge'

/**
 * The props for the {@link Logo} component.
 */
interface LogoProps {
  /**
   * The class name that is merged with the default class name at the root element.
   */
  className?: string
}

/**
 * The reference type for the {@link Logo} component.
 */
type LogoReferenceType = HTMLDivElement

/**
 * The logo of the application.
 *
 * @props {@link LogoProps}
 * @ref {@link LogoReferenceType}
 */
const Logo = forwardRef<LogoReferenceType, LogoProps>(({ className }, ref) => (
  <div
    ref={ref}
    className={merge(
      'flex h-7 w-7 items-center justify-center rounded-lg bg-foreground font-semibold text-background',
      FontLogo.className,
      className,
    )}
    aria-label='Planria'
  >
    <span>P</span>
  </div>
))
Logo.displayName = 'Logo'

export default Logo
