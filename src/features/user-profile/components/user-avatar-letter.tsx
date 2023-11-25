/**
 * The props for the {@link UserAvatarLetter} component.
 */
interface UserAvatarLetterProps {
  /**
   * The letter to display.
   */
  letter: string
  /**
   * The background color for the letter.
   */
  backgroundColor: string
  /**
   * The foreground color for the letter.
   */
  foregroundColor: string
}

/**
 * A component that displays the user's avatar letter.
 *
 * @props {@link UserAvatarLetterProps}
 */
function UserAvatarLetter({ letter, backgroundColor, foregroundColor: color }: UserAvatarLetterProps): JSX.Element {
  return (
    <div
      className='flex h-12 w-12 items-center justify-center rounded-full text-xl font-semibold'
      style={{ backgroundColor, color }}
    >
      {letter}
    </div>
  )
}

export default UserAvatarLetter
