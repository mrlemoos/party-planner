'use client'

import { type HTMLAttributes, type ReactNode } from 'react'

import {
  Fallback as PrimitiveFallback,
  Image as PrimitiveImage,
  AvatarImageProps as PrimitiveImageProps,
  Root as PrimitiveRoot,
} from '@radix-ui/react-avatar'

import ComponentPropNotAllowedException from '@root/exceptions/component-prop-not-allowed-exception'
import getNodeInitialCharacters from '@root/util/get-node-initial-characters'
import merge from '@root/util/merge'

/**
 * Props for the {@link PrimitiveImage} component from Radix UI.
 */
type PickedPrimitiveRootProps = Pick<PrimitiveImageProps, 'src' | 'alt'>
/**
 * The type for the native HTML element attributes via the virtual DOM.
 */
type HTMLElementAttributes = HTMLAttributes<HTMLElement>
/**
 *
 */
type RememberedHTMLElementAttributes = Omit<HTMLElementAttributes, 'children'>
/**
 * The props for the {@link Avatar} component.
 */
interface AvatarProps extends PickedPrimitiveRootProps, RememberedHTMLElementAttributes {
  /**
   * The fallback {@link ReactNode | custom node} to render when the image fails to load. It is recommended to use a
   * string with the user's initials.
   */
  fallback?: ReactNode
  /**
   * @ignore
   */
  children?: never
}

function Avatar({ children, fallback, src, alt, className, ...props }: AvatarProps): JSX.Element {
  if (typeof children !== 'undefined') {
    throw new ComponentPropNotAllowedException('Avatar', 'children')
  }

  const initials = getNodeInitialCharacters(fallback)

  return (
    <PrimitiveRoot
      className={merge('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    >
      <PrimitiveImage src={src} alt={alt} className='aspect-square h-full w-full' />
      <PrimitiveFallback className='flex h-full w-full items-center justify-center rounded-full bg-muted'>
        {initials}
      </PrimitiveFallback>
    </PrimitiveRoot>
  )
}

export default Avatar
