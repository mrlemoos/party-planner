'use client'

import { useMemo, useState } from 'react'

import Badge from '@root/components/ui/badge'
import Button from '@root/components/ui/button'
import Muted from '@root/components/ui/muted'
import useIntervalEffect from '@root/hooks/use-interval-effect'
import merge from '@root/util/merge'

import SlideContentList from './slide-content-list'

/**
 * The colour schema for the gradient. The keys are the principles, the values are the colours.
 */
const BACKGROUND_SCHEMA = {
  collaboration: 'to-collaboration/20',
  planning: 'to-planning/20',
  points: 'to-points/20',
  fun: 'to-fun/20',
} as const

const backgroundSchemaKeys = Object.keys(BACKGROUND_SCHEMA) as (keyof typeof BACKGROUND_SCHEMA)[]

/**
 * The interval at which the gradient is replaced with another. In milliseconds.
 */
const INTERVAL_GRADIENT_REPLACEMENT = 10 * 1000

function Collaboration(): JSX.Element {
  return (
    <SlideContentList header='Collaborate with your team' className='text-collaboration'>
      <li>
        <b>Vote</b> on tasks on realtime.
      </li>
      <li>
        <b>Plan</b> your sprint.
      </li>
      <li>
        <b>Note down</b> risks/thoughts.
      </li>
      <li>
        <b>See</b> the result of your planning ritual.
      </li>
    </SlideContentList>
  )
}
function Planning(): JSX.Element {
  return (
    <SlideContentList header='Plan your sprint' className='text-planning'>
      <li>
        <b>Import</b> tasks from Jira.
        <Badge>Soon</Badge>
      </li>
      <li>
        Jira extension.
        <Badge>Soon</Badge>
      </li>
      <li>
        <b>Plan</b> your sprint.
      </li>
      <li>
        <b>Note down</b> risks and thoughts on tasks.
      </li>
      <li>
        <b>See</b> the result of your planning ritual.
      </li>
    </SlideContentList>
  )
}
function Points(): JSX.Element {
  return (
    <SlideContentList header='Point your tasks' className='text-points'>
      <li>
        <b>Configure</b> your point system.{' '}
        <span className='text-lg text-gray-500'>Options such as Fibonacci, 1-to-10, multiples of 2.</span>
      </li>
      <li>
        <b>Get insights</b> of summary and distribution of points.
      </li>
    </SlideContentList>
  )
}
function Fun(): JSX.Element {
  return (
    <SlideContentList header='Have fun' className='text-fun'>
      <li>
        Set the <b>timer</b>.
      </li>
      <li>
        Hit <Button className='bottom-2'>Play</Button>
      </li>
      <li>
        Start <u>voting</u>!
      </li>
    </SlideContentList>
  )
}

/**
 * The gradient philosophy component.
 */
function GradientPhilosophy(): JSX.Element {
  const [principle, setPrinciple] = useState<keyof typeof BACKGROUND_SCHEMA>('collaboration')

  const background = useMemo(() => BACKGROUND_SCHEMA[principle], [principle])
  const currentPhilosophySlideIndex = useMemo(() => backgroundSchemaKeys.indexOf(principle), [principle])

  useIntervalEffect(
    INTERVAL_GRADIENT_REPLACEMENT,
    function () {
      const principles = Object.keys(BACKGROUND_SCHEMA) as (keyof typeof BACKGROUND_SCHEMA)[]
      const nextPrinciple = principles[(principles.indexOf(principle) + 1) % principles.length]

      setPrinciple(nextPrinciple)
    },
    [principle],
  )

  return (
    <section className={merge('min-h-screen bg-gradient-to-b from-background', background)}>
      <div className='container mt-32 select-none fade-in'>
        <Muted>{`${currentPhilosophySlideIndex + 1}/${backgroundSchemaKeys.length}`}</Muted>
        <div className={merge({ hidden: principle !== 'collaboration' })}>
          <Collaboration />
        </div>
        <div className={merge({ hidden: principle !== 'planning' })}>
          <Planning />
        </div>
        <div className={merge({ hidden: principle !== 'points' })}>
          <Points />
        </div>
        <div className={merge({ hidden: principle !== 'fun' })}>
          <Fun />
        </div>
      </div>
    </section>
  )
}

export default GradientPhilosophy
