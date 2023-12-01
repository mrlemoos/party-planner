import { Roboto_Serif } from 'next/font/google'

const FontLogo = Roboto_Serif({
  display: 'swap',
  preload: true,
  variable: '--font-logo',
  subsets: ['latin'],
  weight: ['500'],
})

export default FontLogo
