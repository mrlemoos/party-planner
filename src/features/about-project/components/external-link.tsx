import { type AnchorHTMLAttributes } from 'react'

import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Link, { type LinkProps } from 'next/link'

import Button from '@root/components/ui/button'

/**
 * Props for the {@link ExternalLink} component.
 */
type ExternalLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * This component is used to display an external link.
 *
 * @props {@link ExternalLinkProps}
 */
function ExternalLink({ children, href, target = '_blank', className, ...props }: ExternalLinkProps): JSX.Element {
  return (
    <Button variant='link' asChild={true}>
      <Link {...props} href={href} target={target} className={className}>
        {children}
        <ExternalLinkIcon aria-hidden='true' height={16} width={16} className='ml-1' />
      </Link>
    </Button>
  )
}

export default ExternalLink
