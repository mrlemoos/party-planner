'use client'

import { type HTMLAttributes } from 'react'

import { cva } from 'class-variance-authority'
import { motion } from 'framer-motion'

import merge from '@root/util/merge'

const selectionCard = cva(
  'flex flex-col items-center justify-center hover:from-purple-700 hover:to-indigo-700 hover:bg-gradient-to-bl transition-all',
  {
    variants: {
      variant: {
        unset: 'bg-background text-foreground',
        selected: 'from-purple-700 to-indigo-700 bg-gradient-to-bl text-white',
      },
    },
  },
)

/**
 * Props for the {@link SelectionCard} component.
 */
interface SelectionCardProps extends Pick<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'onClick'> {
  /**
   * Boolean indicating whether the card is selected.
   */
  isSelected: boolean
}

/**
 * A card that can be selected.
 *
 * @props {@link SelectionCardProps}
 */
function SelectionCard({ isSelected, children, className, onClick }: SelectionCardProps): JSX.Element {
  const variant = isSelected ? 'selected' : 'unset'

  return (
    <motion.button
      onClick={onClick}
      type='button'
      className={merge(
        'h-96 w-full rounded-xl border border-gray-500/50 p-4 transition-all hover:bg-gradient-to-bl',
        selectionCard({ variant, className }),
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
    >
      {children}
    </motion.button>
  )
}

export default SelectionCard
