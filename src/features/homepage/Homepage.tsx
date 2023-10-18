import { type JSX } from 'react';

import cls from 'classnames';

import SizedBox from '@root/components/atoms/SizedBox';

import PhilosophyBanner from './components/molecules/PhilosophyBanner';
import FeatureComposition from './components/molecules/FeatureComposition';

const firstViewSectionId = 'first-view';
const scrumPointingPokerSectionId = 'scrum-pointing-poker';

function Homepage(): JSX.Element {
  return (
    <main className="w-screen min-h-screen overflow-x-hidden">
      <section className="container mx-auto" id={firstViewSectionId}>
        <article className="h-screen flex">
          <div className="flex flex-col">
            <SizedBox height={200} />
            <PhilosophyBanner />
          </div>
        </article>
      </section>
      <section
        className={cls(
          'min-h-[50vh]',
          'bg-gradient-to-br from-white to-purple-500',
          'dark:from-coal dark:to-purple-950'
        )}
        id={scrumPointingPokerSectionId}
      >
        <FeatureComposition />
      </section>
    </main>
  );
}

export default Homepage;
