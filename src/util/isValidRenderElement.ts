import { type ReactElement, isValidElement } from 'react';

export default function isValidRenderElement(
  element: unknown,
): element is ReactElement {
  return typeof element === 'string' || isValidElement(element);
}
