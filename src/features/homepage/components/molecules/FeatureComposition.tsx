import { type JSX } from 'react';

import {
  BarChartIcon,
  GearIcon,
  PersonIcon,
  TargetIcon,
} from '@radix-ui/react-icons';
import cls from 'classnames';

import FeatureShowcase from './FeatureShowcase';
import { compositionWrapper } from './FeatureComposition.css';
import toRem from '@root/util/toRem';

function FeatureComposition(): JSX.Element {
  return (
    <div className="container mx-auto py-16 flex flex-col items-center">
      <h2
        className={cls('text-3xl font-medium mb-8', compositionWrapper)}
        aria-label="Less poker, more planning"
      >
        Less Poker & <strong>More Planning</strong>
        <span aria-hidden="true" style={{ fontSize: toRem(42) }}>
          &nbsp;🎯
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureShowcase
          header="Effective Pointing"
          description="Easily point your user stories with our intuitive interface and save time during your sprint planning."
        >
          <TargetIcon width={32} height={32} />
        </FeatureShowcase>
        <FeatureShowcase
          header="Collaborative Pointing"
          description="Collaborate with your team members and get everyone on the same page with our real-time pointing system."
        >
          <PersonIcon width={32} height={32} />
        </FeatureShowcase>
        <FeatureShowcase
          header="Customizable Settings"
          description="Customize the pointing scale and settings to fit your team‘s needs and preferences."
        >
          <GearIcon width={32} height={32} />
        </FeatureShowcase>
        <FeatureShowcase
          header="Data Insights"
          description="Get insights into your team’s pointing history and performance to improve your sprint planning process."
        >
          <BarChartIcon width={32} height={32} />
        </FeatureShowcase>
      </div>
    </div>
  );
}

export default FeatureComposition;
