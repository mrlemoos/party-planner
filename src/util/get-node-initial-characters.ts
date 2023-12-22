import isValidRenderElement from './is-valid-render-element'

/**
 * Get the initial characters of a string or a valid render element.
 */
function getNodeInitialCharacters<T>(element: T) {
  if (typeof element === 'string') {
    if (element.toUpperCase() === element) {
      return element
    }

    const words = element.split(' ')
    const firstCharacters = words.map((word) => word[0]).join('')

    return firstCharacters
  }
  if (isValidRenderElement(element)) {
    return element
  }
}

export default getNodeInitialCharacters
