import { type ReactNode } from 'react'

import { ClerkProvider } from '@clerk/nextjs'
import { type Metadata, type Viewport } from 'next'
import colors from 'tailwindcss/colors'

import ThemeProvider from '@root/components/ui/theme-provider'
import FontSans from '@root/styles/fonts/font-sans'
import merge from '@root/util/merge'

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
 * The {@link Viewport | viewport} of the application.
 */
export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: colors.white,
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: colors.black,
    },
  ],
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
}

/**
 * The component responsible for defining the layout set for all pages.
 *
 * @props {@link RootLayoutProps}
 */
function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='en'>
      <body className={merge('min-h-screen bg-background font-sans antialiased', FontSans.variable)}>
        <ClerkProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout
