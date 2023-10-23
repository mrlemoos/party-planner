'use client';

import { type JSX, type CSSProperties } from 'react';

import { type Variant, motion, type TargetAndTransition } from 'framer-motion';

import toRem from '@root/util/toRem';

// #region Interfaces & Types

interface FakeUserAvatarProps {
  /**
   * The background color of the avatar. It is a CSS color value that can be
   * expressed in any valid format (e.g. `#fff`, `#ffffff`,
   * `rgb(255, 255, 255)`, `rgba(255, 255, 255, 1)`, `white`, `transparent`,
   * `hsl(0, 0%, 100%)`, `hsla(0, 0%, 100%, 1)`, etc.).
   *
   * This prop corresponds to {@link CSSProperties.backgroundColor} prop from
   * the React's Virtual DOM.
   */
  backgroundColor: CSSProperties['backgroundColor'];

  /**
   * The content of the avatar. It commonly is a single character that
   * represents the first letter of the user's name (e.g. "J" for "Jeff
   * Sutherland").
   *
   * **Note that** this property is required to render the component, otherwise
   * it will throw an error.
   */
  children: string;

  /**
   * A comment that the fake user has made. If defined, this prop is used to
   * display the comment in a bubble on the right side of the avatar.
   */
  comment?: string;

  /**
   * The time in seconds that the animation will take to complete. This prop
   * corresponds to `transition.duration` prop from the `framer-motion`'s
   * {@link Variant} (re: {@link TargetAndTransition}) interface.
   *
   * Given the {@link comment} prop is defined, the delay of the comment
   * animation will be calculated by multiplying the {@link delayBasis} prop
   * by `2`.
   *
   * @see {@link Variant}
   */
  delayBasis: number;

  /**
   * The time in seconds that the animation will take to complete. This prop
   * corresponds to `transition.duration` prop from the `framer-motion`'s
   * {@link Variant} (re: {@link TargetAndTransition}) interface.
   *
   * Given the {@link comment} prop is defined, the duration of the comment
   * animation will be calculated by multiplying the {@link durationBasis} prop
   * and `0.4`.
   *
   * @see {@link Variant}
   */
  durationBasis: number;

  /**
   * The position of the fake user in the list of fake users. This prop is used
   * to calculate the delay and duration of the animation.
   *
   * The position helps to calculate the delay and duration of the animation by
   * multiplying the {@link delayBasis} and {@link durationBasis} props by the
   * position of the fake user in the list of fake users.
   *
   * @default 0
   */
  position?: number;
}

// #endregion

// #region Constants & Utilities

function $isCommentValid(comment?: string) {
  return typeof comment === 'string' && comment.length >= 1;
}

const MOTION_AVATAR_INITIAL = {
  opacity: 0,
};
const MOTION_AVATAR_ANIMATE = {
  opacity: 1,
};

const POSITION = [
  [{ x: 120, y: 140, opacity: 0 }, { opacity: 1 }],
  [{ x: -30, y: 238, opacity: 0 }, { opacity: 1 }],
  [{ x: 120, y: 300, opacity: 0 }, { opacity: 1 }],
  [{ x: 0, y: -10, opacity: 0 }, { opacity: 1 }],
];

// #endregion

function FakeUserAvatar({
  backgroundColor,
  children,
  comment,
  delayBasis,
  durationBasis,
  position = 0,
}: FakeUserAvatarProps): JSX.Element {
  const nonNilPosition = position + 1;

  const [hidden, expand] = POSITION[position];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none flex items-center"
      variants={{
        hidden,
        expand: {
          ...expand,
          transition: {
            delay: delayBasis * nonNilPosition,
            duration: durationBasis * nonNilPosition,
          },
        },
      }}
      initial="hidden"
      animate="expand"
    >
      <motion.div
        style={{
          height: toRem(36),
          width: toRem(36),
          backgroundColor,
        }}
        initial={MOTION_AVATAR_INITIAL}
        animate={MOTION_AVATAR_ANIMATE}
        className="flex items-center justify-center rounded-full border border-white text-lg font-semibold text-white shadow-xl"
      >
        {children?.charAt(0)}
      </motion.div>
      {$isCommentValid(comment) && (
        <motion.div
          style={{ backgroundColor }}
          className="rounded-md px-2 py-1"
          variants={{
            hidden: {
              opacity: 0,
              x: 100,
            },
            expand: {
              opacity: 1,
              x: 0,
              transition: {
                delay: delayBasis * nonNilPosition + 5,
              },
            },
          }}
          initial="hidden"
          animate="expand"
        >
          {comment}
        </motion.div>
      )}
    </motion.div>
  );
}

export default FakeUserAvatar;
