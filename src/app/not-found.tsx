import { type Metadata } from 'next'

import Footer from '@root/components/ui/footer'
import NotFoundPage from '@root/features/not-found-page/not-found-page'
import FontLogo from '@root/styles/fonts/font-logo'
import FontSans from '@root/styles/fonts/font-sans'
import FontSansSerif from '@root/styles/fonts/font-serif-sans'
import merge from '@root/util/merge'

export const metadata: Metadata = {
  title: 'Planria • 😥 Page not found',
  description: 'We could not find the page you were looking for. 😥',
  robots: 'noindex, nofollow',
}

function NotFound(): JSX.Element {
  return (
    <div className={merge('mt-8', FontSans.className)}>
      <header className='mx-auto my-auto w-14'>
        <span className={merge(FontLogo.className, 'text-lg text-foreground')}>Planria</span>
      </header>
      <main className={merge('container mt-[12dvh] h-[calc(80dvh_-_120px)]', FontSansSerif.className)}>
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
