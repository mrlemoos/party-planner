import Heading from '@root/components/ui/heading'
import type UserCollaborationMetadataModel from '@root/models/user-collaboration-metadata-model'
import type UserModel from '@root/models/user-model'
import type UserPlanModel from '@root/models/user-plan-model'
import merge from '@root/util/merge'

import Tooltip from '@root/components/ui/tooltip'
import ContactInfoEmail from './components/contact-info-email'
import ContactInfoPhone from './components/contact-info-phone'
import UserAvatar from './components/user-avatar'
import UserHandle from './components/user-handle'

type PickedUserCollaborationMetadataModel = Pick<
  UserCollaborationMetadataModel,
  'avatarBackgroundColor' | 'avatarForegroundColor'
>

/**
 * The props for the {@link UserProfile} component.
 */
interface UserProfileProps extends PickedUserCollaborationMetadataModel {
  /**
   * The {@link UserModel | user} whose profile is being displayed.
   */
  readonly user: UserModel
  /**
   * The {@link UserPlanModel | plan} to which the user is subscribed.
   */
  readonly plan: Pick<UserPlanModel, 'name' | 'price' | 'period'>
}

/**
 * The user profile page.
 *
 * @props {@link UserProfileProps}
 */
function UserProfile({ user, plan, avatarBackgroundColor, avatarForegroundColor }: UserProfileProps): JSX.Element {
  const letter = user.displayName[0]

  return (
    <main className='container mt-40 min-h-[76vh]'>
      <section className='flex flex-col items-center justify-center gap-3'>
        <UserAvatar
          source={user.photoURL}
          alt={`${user.displayName}'s picture`}
          backgroundColor={avatarBackgroundColor}
          foregroundColor={avatarForegroundColor}
          letter={letter}
        />
        <div className='flex flex-col items-center gap-2'>
          <Heading hierarchy='h2'>{user.displayName}</Heading>
          <span className='cursor-default rounded-2xl bg-foreground/10 px-8 py-1'>
            <Tooltip
              content={
                <div className='flex flex-col items-center'>
                  <span className='text-base text-background'>
                    <span className='font-semibold'>{plan.price} USD</span>
                    <span className='font-light'>/{plan.period}</span>
                  </span>
                  <span className='text-base font-light'>Click to take a look at all plans.</span>
                </div>
              }
              hasArrow={true}
              side='right'
              sideOffset={48}
            >
              <span className='font-medium'>{plan.name}</span>
            </Tooltip>
            <span className='font-light'>&nbsp;Plan</span>
          </span>
          <div
            className={merge(
              'flex h-5 items-center gap-2',
              '[&>*]:after:mx-4 [&>*]:after:h-4 [&>*]:after:w-0.5 [&>*]:after:bg-slate-300 [&>*]:after:content-["\'\'"] [&>*]:dark:after:bg-slate-600',
              '[&>*:last-child]:after:content-none',
            )}
          >
            <UserHandle at={user.username} />
            <ContactInfoEmail isVerified={user.isEmailVerified}>{user.email}</ContactInfoEmail>
            <ContactInfoPhone>{user.phoneNumber}</ContactInfoPhone>
          </div>
        </div>
      </section>
    </main>
  )
}

export default UserProfile
