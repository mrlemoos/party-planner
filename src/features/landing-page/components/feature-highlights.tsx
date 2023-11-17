import { type ReactNode } from 'react'

import { CommitIcon, GearIcon, LightningBoltIcon, PersonIcon, TargetIcon } from '@radix-ui/react-icons'

import Heading from '@root/components/ui/heading'

/**
 * The props for the {@link FeatureHighlightItem} component.
 */
interface FeatureHighlightItemProps {
  children: ReactNode
}

/**
 * A component to render the feature highlights, e.g. "Effective Pointing." It must contain two
 * {@link FeatureHighlightItemProps.children children} - the first is the icon, and the second is the text.
 *
 * @props {@link FeatureHighlightItemProps}
 */
function FeatureHighlightItem({ children }: FeatureHighlightItemProps): JSX.Element {
  return <div className='flex items-center gap-6 md:w-[512px]'>{children}</div>
}

/**
 * The size of the icon in the feature highlight item.
 */
const FEATURE_HIGHLIGHT_ITEM_ICON_SIZE = 32 as const

/**
 * A component to render the feature highlights section of the landing page.
 */
function FeatureHighlights(): JSX.Element {
  return (
    <section className='container mt-[30vh]' id='feature-highlights'>
      <Heading
        hierarchy='h2'
        className='flex justify-center text-base font-normal sm:text-lg md:text-3xl lg:text-4xl lg:leading-[64px]'
        aria-label='Less poker, more planning'
      >
        <span>Less Poker &&nbsp;</span>
        <span className='font-extrabold'>More Planning 🎯</span>
      </Heading>
      <div className='mt-4 flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row'>
        <FeatureHighlightItem>
          <TargetIcon
            height={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE}
            width={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE}
            aria-hidden='true'
          />
          <div className='flex flex-col'>
            <span className='font-medium'>Effective Pointing</span>
            <span className='text-gray-500 dark:text-gray-300'>
              Easily point your user stories with our intuitive interface and save time during your sprint planning.
            </span>
          </div>
        </FeatureHighlightItem>
        <FeatureHighlightItem>
          <PersonIcon
            height={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE * 1.5}
            width={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE * 1.5}
            aria-hidden='true'
          />
          <div className='flex flex-col'>
            <span className='font-medium'>Collaborative Pointing</span>
            <span className='text-gray-500 dark:text-gray-300'>
              Collaborate with your team members and get everyone on the same page with our real-time pointing system.
            </span>
          </div>
        </FeatureHighlightItem>
        <FeatureHighlightItem>
          <GearIcon
            height={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE * 0.875}
            width={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE * 0.875}
            aria-hidden='true'
          />
          <div className='flex flex-col'>
            <span className='font-medium'>Customizable Settings</span>
            <span className='text-gray-500 dark:text-gray-300'>
              Customize the pointing scale and settings to fit your team‘s needs and preferences.
            </span>
          </div>
        </FeatureHighlightItem>
        <FeatureHighlightItem>
          <LightningBoltIcon
            height={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE}
            width={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE}
            aria-hidden='true'
          />
          <div className='flex flex-col'>
            <span className='font-medium'>Low Latency Realtime Collaboration</span>
            <span className='text-gray-500 dark:text-gray-300'>
              Realtime. No lag. No delay. No waiting. Just point and go.
            </span>
          </div>
        </FeatureHighlightItem>
        <FeatureHighlightItem>
          <CommitIcon
            height={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE}
            width={FEATURE_HIGHLIGHT_ITEM_ICON_SIZE}
            aria-hidden='true'
          />
          <div className='flex flex-col'>
            <span className='font-medium'>History of Sprint Planning</span>
            <span className='text-gray-500 dark:text-gray-300'>
              Customize the pointing scale and settings to fit your team‘s needs and preferences.
            </span>
          </div>
        </FeatureHighlightItem>
      </div>
    </section>
  )
}

export default FeatureHighlights
