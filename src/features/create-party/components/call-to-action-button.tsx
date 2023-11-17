import Link from 'next/link'

import Button from '@root/components/ui/button'

interface CallToActionButtonProps {
  /**
   * The link to the pathname for the party board.
   */
  href: string
}

/**
 * The component that renders the call to action button to redirect the user to the party board.
 *
 * @props {@link CallToActionButtonProps}
 */
function CallToActionButton({ href }: CallToActionButtonProps): JSX.Element {
  return (
    <Button className='w-full' asChild={true}>
      <Link href={href} target='_self'>
        Dive in!
      </Link>
    </Button>
  )
}

export default CallToActionButton
