'use client'

import { type HTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import FontSansSerif from '@root/styles/fonts/font-serif-sans'
import merge from '@root/util/merge'

const emblemStyles = cva('', {
  variants: {
    size: {
      lg: 'h-16 w-16 text-2xl',
      md: 'h-12 w-12 text-xl',
      sm: 'h-8 w-8 text-sm',
    },
  },
})

type HTMLElementAttributes = Omit<HTMLAttributes<HTMLElement>, 'children'>

interface EmblemProps extends HTMLElementAttributes, VariantProps<typeof emblemStyles> {
  /**
   * The boolean that, if true, will block the user from performing any action
   * on the emblem component.
   *
   * @default true.
   */
  disabled?: boolean
}

/**
 * The component that renders the emblem of the product.
 *
 * @props {@link EmblemProps}
 */
function Emblem({ className, size = 'md', ...props }: EmblemProps): JSX.Element {
  return (
    <span
      {...props}
      className={merge(
        FontSansSerif.className,
        emblemStyles({ size }),
        'flex items-center justify-center border-2 border-purple-500 p-3 font-bold text-black shadow-sm transition',
        'border bg-purple-300 shadow-sm transition',
        'rounded-bl-xl rounded-tr-xl',
        'hover:border-black hover:shadow-2xl',
        'hover:bg-purple-100',
        className,
      )}
    >
      P&P
    </span>
  )
}

export default Emblem
