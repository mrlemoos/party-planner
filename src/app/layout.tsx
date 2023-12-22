import { type ReactNode } from 'react'

import { ClerkProvider } from '@clerk/nextjs'
import { type Metadata } from 'next'
import colors from 'tailwindcss/colors'

import ThemeProvider from '@root/components/ui/theme-provider'
import FontSans from '@root/styles/fonts/font-sans'
import classes from '@root/util/classes'

import '@root/styles/globals.css'

/**
 * The {@link Metadata | metadata} of the application.
 */
export const metadata: Metadata = {
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

/**
 * The interface that maps the URL query parameters to the layout.
 */
interface RootLayoutSearchParams {
  /**
   * The URL query parameter that defines the language of the page.
   *
   * @default 'en'
   */
  lang?: 'en'
}

/**
 * The props of the layout.
 */
interface RootLayoutProps {
  /**
   * The children of the layout, corresponding to literally every page of the application.
   *
   * @see {@link ReactNode}
   */
  children: ReactNode
  /**
   * The mapped URL search params.
   *
   * @see {@link RootLayoutSearchParams}
   */
  searchParams?: RootLayoutSearchParams
}

/**
 * The component responsible for defining the layout set for all pages.
 *
 * @props {@link RootLayoutProps}
 */
function RootLayout({ children, searchParams: { lang = 'en' } = {} }: RootLayoutProps): JSX.Element {
  return (
    <html lang={lang}>
      <head>
        <meta name='theme-color' media='(prefers-color-scheme: light)' content={colors.white} />
        <meta name='theme-color' media='(prefers-color-scheme: dark)' content={colors.black} />
      </head>
      <body className={classes('min-h-screen bg-background font-sans antialiased', FontSans.variable)}>
        <ClerkProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout
