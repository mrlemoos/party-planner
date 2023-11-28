import Image from 'next/image'

import UserAvatarPhotoDidNotLoadEvent from '@root/events/user-avatar-photo-did-not-load-event'

/**
 * The {@link UserAvatarPhotoDidNotLoadEvent | event} handler in case of an error while loading the image.
 */
interface UserAvatarPhotoErrorEventHandler {
  (event: UserAvatarPhotoDidNotLoadEvent): void
}

/**
 * The props for the {@link UserAvatarPhoto} component.
 */
interface UserAvatarPhotoProps {
  /**
   * The URL for the image source. It is a string that is passed on to the `src` attribute of the {@link Image | image}
   * component from Next.js.
   *
   * @see https://nextjs.org/docs/api-reference/next/image#src
   */
  source: string
  /**
   * The alternative text for the image. It is a string that is passed on to the `alt` attribute of the
   * {@link Image | image} component from Next.js.
   */
  alt: string
  /**
   * Function that is called when an error occurs while loading the image.
   *
   * @see https://nextjs.org/docs/api-reference/next/image#onerror
   * @see {@link UserAvatarPhotoDidNotLoadEvent}
   * @see {@link UserAvatarPhotoErrorEventHandler}
   */
  onError?: UserAvatarPhotoErrorEventHandler
}

/**
 * A component that displays the user's avatar photo.
 *
 * @props {@link UserAvatarPhotoProps}
 */
function UserAvatarPhoto({ source, alt, onError }: UserAvatarPhotoProps): JSX.Element {
  function handleNextImageError() {
    if (typeof onError === 'function') {
      onError(new UserAvatarPhotoDidNotLoadEvent(source, alt, true))
    }
  }

  return <Image className='rounded-full' src={source} alt={alt} width={48} height={48} onError={handleNextImageError} />
}

export default UserAvatarPhoto
