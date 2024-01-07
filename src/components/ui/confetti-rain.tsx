'use client'

import { forwardRef, useCallback, useImperativeHandle, useState, type CSSProperties } from 'react'

import ReactConfetti, { type Props as ReactConfettiProps } from 'react-confetti'

import useWindowSize from '@root/hooks/use-window-size'

/**
 * The event that is emitted when the confetti animation is complete.
 */
class ConfettiRainCompleteEvent {
  constructor(
    /**
     * The number of pieces of confetti that were rendered on the screen.
     */
    public readonly pieces: number,
    /**
     * The canvas HTML element that was used to render the confetti animation.
     */
    public readonly canvasElement: HTMLCanvasElement | undefined,
  ) {}
}

/**
 * The props for the {@link ConfettiRain} component.
 */
interface ConfettiRainProps {
  /**
   * The number of pieces of confetti to render on the screen at once.
   *
   * @default 300
   */
  pieces: number

  /**
   * The event listener that is called when the confetti animation is complete.
   */
  onConfettiComplete?: (event: ConfettiRainCompleteEvent) => void
}

interface ConfettiRainImperativeRef {
  /**
   * The function that starts the confetti animation.
   *
   * Note that this function will not start the animation if the component is already animating confetti. It will only
   * be possible after the {@link ConfettiRainProps.onConfettiComplete | `onConfettiComplete()`} event is called.
   *
   * @see {@link ConfettiRainProps.onConfettiComplete}
   * @see {@link ConfettiRainCompleteEvent}
   */
  animateConfetti: () => void
  /**
   * The boolean that indicates whether or not the component is currently animating confetti.
   */
  isAnimating: boolean
}

/**
 * The event handler that is called when the confetti animation is complete.  **Internal use only.**
 *
 * @internal
 *
 * @see {@link ConfettiRainProps.onConfettiComplete}
 */
type HandleConfettiCompleteEventHandler = NonNullable<ReactConfettiProps['onConfettiComplete']>

/**
 * The style that is applied to the {@link ReactConfetti confetti} component to override the default.
 */
const confettiOverrideStyle: CSSProperties = {
  pointerEvents: 'none',
  position: 'fixed',
  inset: 0,
}

/**
 * A component that renders a confetti animation on the screen.
 *
 * The {@link ConfettiRainImperativeRef | imperative ref} can be used to start the animation via the
 * {@link ConfettiRainImperativeRef.animateConfetti | `animateConfetti()`} function call.
 *
 * @props {@link ConfettiRainProps}
 * @ref {@link ConfettiRainImperativeRef}
 */
const ConfettiRain = forwardRef<ConfettiRainImperativeRef, ConfettiRainProps>(
  ({ onConfettiComplete, pieces = 300 }, ref) => {
    const [isAnimating, setAnimatingState] = useState(false)
    const { width, height } = useWindowSize()

    const handleConfettiComplete = useCallback<HandleConfettiCompleteEventHandler>(
      (confettiInstance) => {
        confettiInstance?.reset()
        onConfettiComplete?.(new ConfettiRainCompleteEvent(pieces, confettiInstance?.canvas))
        setAnimatingState(false)
      },
      [onConfettiComplete, pieces],
    )

    const animateConfetti = useCallback(() => {
      if (isAnimating) {
        return
      }

      setAnimatingState(true)
    }, [isAnimating])

    useImperativeHandle(
      ref,
      () => ({
        animateConfetti,
        isAnimating,
      }),
      [animateConfetti, isAnimating],
    )

    return (
      <ReactConfetti
        style={confettiOverrideStyle}
        numberOfPieces={isAnimating ? pieces : 0}
        recycle={false}
        className='fixed inset-0'
        confettiSource={{
          x: 0,
          y: 0,
          w: width,
          h: height,
        }}
        onConfettiComplete={handleConfettiComplete}
      />
    )
  },
)
ConfettiRain.displayName = 'ConfettiRain'

export default ConfettiRain
