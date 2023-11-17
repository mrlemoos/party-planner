import { type ComponentProps } from 'react'

import classes from '@root/util/classes'

type BlockquoteProps = ComponentProps<'blockquote'>

function Blockquote({ children, className, ...props }: BlockquoteProps): JSX.Element {
  return (
    <blockquote className={classes('mt-6 border-l-2 pl-6 italic', className)} {...props}>
      {children}
    </blockquote>
  )
}

export default Blockquote
