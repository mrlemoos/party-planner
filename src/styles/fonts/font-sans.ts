import { Inter } from 'next/font/google'

const FontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Open Sans', 'sans-serif'],
})

export default FontSans
