import FeatureFlagService from '@root/services/feature-flag-service'

import EnrollWaitingListForm from './enroll-waiting-list-form'
import EnrollmentToWaitingListSuccess from './enrollment-to-waiting-list-success'
import WhyWeBuiltThis from './why-we-built-this'

/**
 * This service is used to interact with the feature flag API.
 *
 * @see {@link FeatureFlagService}
 */
const features = new FeatureFlagService()

/**
 * This component is used to display a message to users that the app is closed to new email sign-ups.
 */
async function WaitingListAnnouncement(): Promise<JSX.Element | null> {
  // Note: This feature flag is used to control whether the app is closed to new email sign-ups. If the feature flag is
  // disabled, then we don't need to display the waiting list announcement.
  const isWaitingListEnabled = await features.getFeatureFlag('closed-to-wait-list')

  if (!isWaitingListEnabled) {
    return null
  }

  return (
    <section className='container'>
      <div className='flex flex-col items-center justify-center'>
        <WhyWeBuiltThis />

        <div className='mt-16'>
          <EnrollWaitingListForm />
          <EnrollmentToWaitingListSuccess />
        </div>
      </div>
    </section>
  )
}

export default WaitingListAnnouncement
