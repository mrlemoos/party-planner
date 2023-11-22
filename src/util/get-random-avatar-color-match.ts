import avatarColorMatches from '@root/constants/avatar-color-matches'

import getRandomNumber from './get-random-number'

/**
 * Returns a random {@link avatarColorMatches avatar color match}. An avatar color match is an object with a
 * `backgroundColor` and `foregroundColor` that is indicated to be used for the user's representation of present
 * throughout the application.
 */
export default function getRandomAvatarColorMatch(): (typeof avatarColorMatches)[number] {
  const randomIndex = getRandomNumber(avatarColorMatches.length)

  const colorMatch = avatarColorMatches[randomIndex]

  return colorMatch
}
