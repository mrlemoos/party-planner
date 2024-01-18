import { Work_Sans } from 'next/font/google'

const FontCurrency = Work_Sans({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-currency',
})

export default FontCurrency
