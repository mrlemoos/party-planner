import { ArrowLeftIcon } from '@radix-ui/react-icons'

import Button from '@root/components/ui/button'
import FontSans from '@root/styles/fonts/font-sans'

import redirectToHomepage from '../server-actions/redirect-to-homepage'

function NotFoundCallToAction(): JSX.Element {
  return (
    <div className='mt-[10dvh] flex justify-center'>
      <form action={redirectToHomepage} className={FontSans.className}>
        <Button type='submit' size='lg'>
          <ArrowLeftIcon className='mr-2 h-4 w-4' aria-hidden='true' />
          Redirect to home
        </Button>
      </form>
    </div>
  )
}

export default NotFoundCallToAction
