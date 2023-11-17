'use client'

import { type ReactNode } from 'react'

import { ThemeProvider as NextThemeProvider } from 'next-themes'

/**
 * The theme that the `next-themes` package will default to given that the user has not set a preferred theme.
 */
const defaultTheme = 'system' as const
/**
 * The attribute that the `next-themes` package will use to set the theme and identify which theme the user has set.
 */
const themeAttribute = 'class' as const

interface ThemeProviderProps {
  /**
   * The children in custom {@link React | node(s)} in which the theme will be applied to.
   *
   * @see {@link ReactNode}
   */
  children: ReactNode
}

/**
 * The component that provides the theme to the application. Preferably, this component should be placed at the root of
 * the application, e.g. `@root/app/layout.tsx` hence the nested routes will be able to access the theme.
 *
 * @see https://npmjs.com/package/next-themes
 * @see https://ui.shadcn.com/docs/dark-mode/next
 */
function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  return (
    <NextThemeProvider attribute={themeAttribute} defaultTheme={defaultTheme} enableSystem={true}>
      {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider
