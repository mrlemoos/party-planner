'use client'

import { RefObject, useEffect, useRef } from 'react'

import ObservableElementEvent from '@root/events/observable-element-event'

/**
 * The props for the {@link useObservableElement} hook.
 */
interface UseObservableElementProps {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds
   *
   * As MDN web docs describes: "Rather than reporting every infinitesimal change in how much a target element is
   * visible, the {@link IntersectionObserver | Intersection Observer API} uses thresholds. When you create an observer,
   * you can provide one or more numeric values representing percentages of the target element which are visible. Then,
   * the API only reports changes to visibility which cross these thresholds."
   *
   * @default 1
   */
  threshold?: number
  /**
   * The IntersectionObserver interface's read-only root property identifies the Element or Document whose bounds are
   * treated as the bounding box of the viewport for the element which is the observer's target. If the root is `null`,
   * then the bounds of the actual document viewport are used.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root
   */
  root?: Element
  /**
   * The IntersectionObserver interface's read-only rootMargin property is a string with syntax similar to that of the
   * CSS margin property. Each side of the rectangle represented by rootMargin is added to the corresponding side in the
   * root element's bounding box before the intersection test is performed. This lets you, for example, adjust the
   * bounds outward so that the target element is considered 100% visible even if a certain number of pixels worth of
   * width or height is clipped away, or treat the target as partially hidden if an edge is too close to the edge of the
   * root's bounding box.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
   */
  rootMargin?: string
  /**
   * Function that works as an event handler for the {@link ObservableElementEvent event} dispatched when the element
   * intersects with the viewport, i.e., when the element comes into view.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#callback
   * @see {@link IntersectionObserver}
   * @see {@link ObservableElementEvent}
   */
  onIntersect?: (event: ObservableElementEvent) => void
}

/**
 * The {@link useObservableElement} hook is a React hook that returns a {@link RefObject} that can be used to observe
 * when an element intersects with the viewport, i.e., when the element comes into view.
 *
 * @props {@link UseObservableElementProps}
 */
function useObservableElement<E extends HTMLElement | SVGElement>({
  threshold = 1,
  root,
  rootMargin,
  onIntersect,
}: UseObservableElementProps): RefObject<E> {
  const observableElementRef = useRef<E>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      function ([intersectionEntry, ...otherIntersectionEntries], { thresholds, root: intersectionRootElement }) {
        if (intersectionEntry.isIntersecting) {
          const isTrackedElementIntoView = intersectionEntry.intersectionRatio === 1
          const event = new ObservableElementEvent(
            isTrackedElementIntoView,
            intersectionEntry,
            otherIntersectionEntries,
            intersectionRootElement,
            threshold,
            thresholds,
          )
          if (typeof onIntersect === 'function') {
            onIntersect(event)
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    )

    // NOTE: We need to use the current value of the ref because the ref value may change before the effect cleanup
    // function runs. If the ref value changes, the effect cleanup function runs too late and the component may try to
    // unobserve the wrong element.
    const observedElement = observableElementRef.current

    if (observedElement) {
      observer.observe(observedElement)
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement)
      }
    }
  }, [threshold, root, rootMargin, onIntersect])

  return observableElementRef
}

export default useObservableElement
