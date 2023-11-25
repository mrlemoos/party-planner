'use client'

import { useCallback, useState, type ComponentPropsWithoutRef } from 'react'

import UserAvatarLetter from './user-avatar-letter'
import UserAvatarPhoto from './user-avatar-photo'

/**
 * The props for the {@link UserAvatar} component.
 */
type UserAvatarProps = Omit<Partial<ComponentPropsWithoutRef<typeof UserAvatarPhoto>>, 'onError'> &
  Partial<ComponentPropsWithoutRef<typeof UserAvatarLetter>>

/**
 * The class name for the container of the avatar.
 */
const CONTAINER_CLASS_NAME = 'pointer-events-none relative select-none' as const

/**
 * A component that displays the user's avatar.
 *
 * @props {@link UserAvatarProps}
 */
function UserAvatar({
  letter,
  backgroundColor = '',
  foregroundColor = '',
  source,
  alt,
}: UserAvatarProps): JSX.Element | null {
  const [hasError, setError] = useState(false)

  const handleError = useCallback(() => setError(true), [])

  if (hasError) {
    return (
      <div className={CONTAINER_CLASS_NAME}>
        <UserAvatarLetter
          letter={alt?.charAt(0) ?? '@'}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        />
      </div>
    )
  }

  if (letter && backgroundColor && foregroundColor) {
    return (
      <div className={CONTAINER_CLASS_NAME}>
        <UserAvatarLetter letter={letter} backgroundColor={backgroundColor} foregroundColor={foregroundColor} />
      </div>
    )
  }
  if (source && alt) {
    return (
      <div className={CONTAINER_CLASS_NAME}>
        <UserAvatarPhoto source={source} alt={alt} onError={handleError} />
      </div>
    )
  }
  return null
}

export default UserAvatar
