/**
 * The event that is fired when a user's avatar photo fails to load.
 */
export default class UserAvatarPhotoDidNotLoadEvent {
  /**
   * Constructs a new instance of the event.
   */
  public constructor(
    /**
     * The URI of the image that failed to load.
     */
    public readonly imageSourceURI: string,
    /**
     * The `alt` text of the image that failed to load.
     */
    public readonly imageAltText: string,
    /**
     * Boolean indicating whether the image was attempted to be loaded by a Next.js Image component.
     *
     * @see https://nextjs.org/docs/api-reference/next/image
     */
    public readonly isImageFromNext: boolean,
  ) {}
}
