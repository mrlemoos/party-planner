import { Fragment, type ComponentPropsWithoutRef } from 'react'

import Heading from '@root/components/ui/heading'
import type UserCollaborationMetadataModel from '@root/models/user-collaboration-metadata-model'
import type UserModel from '@root/models/user-model'
import merge from '@root/util/merge'

import ContactInfoEmail from './components/contact-info-email'
import ContactInfoPhone from './components/contact-info-phone'
import UserAvatar from './components/user-avatar'
import UserHandle from './components/user-handle'
import UserPlanSection from './components/user-plan-section'
import UserPlanSectionDialog from './components/user-plan-section-dialog'

/**
 * The picked props from the {@link UserCollaborationMetadataModel}.
 */
type PickedUserCollaborationMetadataModel = Pick<
  UserCollaborationMetadataModel,
  'avatarBackgroundColor' | 'avatarForegroundColor'
>
/**
 * The props for the {@link UserPlanSectionDialog} component.
 */
type UserPlanSectionDialogProps = ComponentPropsWithoutRef<typeof UserPlanSectionDialog>
/**
 * The (picked) props for the {@link UserPlanSectionDialog} component.
 */
type PickedUserPlanSectionProps = Pick<UserPlanSectionDialogProps, 'allPlans'>
/**
 * The props for the {@link UserProfile} component.
 */
interface UserProfileProps extends PickedUserCollaborationMetadataModel, PickedUserPlanSectionProps {
  /**
   * The {@link UserModel | user} whose profile is being displayed.
   */
  readonly user: UserModel
  /**
   * The ID of the user's current plan.
   */
  readonly userCurrentPlanId: string
}

/**
 * The user profile page.
 *
 * @props {@link UserProfileProps}
 */
function UserProfile({
  user: { displayName, photoURL, username, email, phoneNumber, isEmailVerified },
  avatarBackgroundColor,
  avatarForegroundColor,
  userCurrentPlanId,
  allPlans,
}: UserProfileProps): JSX.Element {
  const letter = displayName[0]
  const userCurrentPlan = allPlans.find(({ id }) => id === userCurrentPlanId)!

  return (
    <Fragment>
      <main className='container mt-40 min-h-[76vh]'>
        <section className='flex flex-col items-center justify-center gap-3'>
          <UserAvatar
            source={photoURL}
            alt={`${displayName}'s picture`}
            backgroundColor={avatarBackgroundColor}
            foregroundColor={avatarForegroundColor}
            letter={letter}
          />
          <div className='flex flex-col items-center gap-2'>
            <Heading hierarchy='h2'>{displayName}</Heading>
            <UserPlanSection userCurrentPlan={userCurrentPlan} />
            <div
              className={merge(
                'flex h-5 items-center gap-2',
                '[&>*]:after:mx-4 [&>*]:after:h-4 [&>*]:after:w-0.5 [&>*]:after:bg-slate-300 [&>*]:after:content-["\'\'"] [&>*]:dark:after:bg-slate-600',
                '[&>*:last-child]:after:content-none',
              )}
            >
              <UserHandle at={username} />
              <ContactInfoEmail isVerified={isEmailVerified}>{email}</ContactInfoEmail>
              <ContactInfoPhone>{phoneNumber}</ContactInfoPhone>
            </div>
          </div>
        </section>
      </main>
      <UserPlanSectionDialog allPlans={allPlans} userCurrentPlan={userCurrentPlan} />
    </Fragment>
  )
}

export default UserProfile
