import { type ReactElement, isValidElement } from 'react'

/**
 * Type guard that checks if the element is a valid {@link ReactElement | React element} and returns a boolean of the
 * result.
 */
export default function isReactElementValid(element: unknown): element is ReactElement {
  return isValidElement(element)
}
