'use client'

import { useCallback, useState, type ComponentPropsWithoutRef } from 'react'

import UserAvatarPhotoDidNotLoadEvent from '@root/events/user-avatar-photo-did-not-load-event'

import UserAvatarLetter from './user-avatar-letter'
import UserAvatarPhoto from './user-avatar-photo'

/**
 * The props from the {@link UserAvatarPhoto} component.
 */
type UserAvatarPhotoProps = ComponentPropsWithoutRef<typeof UserAvatarPhoto>
/**
 * The props from the {@link UserAvatarLetter} component.
 */
type UserAvatarLetterProps = ComponentPropsWithoutRef<typeof UserAvatarLetter>
/**
 * The (remembered) props from the {@link UserAvatarPhoto} component.
 */
type RememberedUserAvatarProps = Omit<UserAvatarPhotoProps, 'onError'>
/**
 * The (partial) remembered props from the {@link UserAvatarPhoto} component.
 */
type RememberedPartialUserAvatarProps = Partial<RememberedUserAvatarProps>
/**
 * The (partial) props from the {@link UserAvatarLetter} component.
 */
type PartialUserAvatarLetterProps = Partial<UserAvatarLetterProps>
/**
 * The props for the {@link UserAvatar} component.
 */
type UserAvatarProps = RememberedPartialUserAvatarProps & PartialUserAvatarLetterProps

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
  const [imageDidNotLoadDueToError, setImageDidNotLoadDueToError] = useState(false)

  const handleUserAvatarPhotoError = useCallback(({ isImageFromNext }: UserAvatarPhotoDidNotLoadEvent) => {
    if (isImageFromNext) {
      setImageDidNotLoadDueToError(true)
    }
  }, [])

  if (imageDidNotLoadDueToError) {
    const letter = alt?.charAt(0) ?? '@'

    return (
      <div className={CONTAINER_CLASS_NAME}>
        <UserAvatarLetter letter={letter} backgroundColor={backgroundColor} foregroundColor={foregroundColor} />
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
        <UserAvatarPhoto source={source} alt={alt} onError={handleUserAvatarPhotoError} />
      </div>
    )
  }
  return null
}

export default UserAvatar
