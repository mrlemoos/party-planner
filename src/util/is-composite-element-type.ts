import { type ReactElement } from 'react'
import isReactElementValid from './is-react-element-valid'

/**
 * Type guard that checks if the element is a valid {@link ReactElement | React element} whose `type` is a function and,
 * therefore, a composite element.
 *
 * A composite element is a React element whose `type` is a function. This includes class components and function
 * components.
 */
export default function isCompositeElementType(element: unknown): element is ReactElement {
  return isReactElementValid(element) && typeof element.type === 'function'
}
