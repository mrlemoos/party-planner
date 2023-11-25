import { type ReactElement } from 'react'

import isReactElementValid from './is-react-element-valid'

/**
 * Type guard that checks if the element is a valid {@link ReactElement | React element} whose `type` is a string and,
 * therefore, a DOM element.
 */
export default function isDOMElementType(element: unknown): element is ReactElement {
  return isReactElementValid(element) && typeof element.type === 'string'
}
