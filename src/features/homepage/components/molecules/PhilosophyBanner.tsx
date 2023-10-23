import { type JSX, Fragment } from 'react';

import SizedBox from '@root/components/atoms/SizedBox';
import NavigationAnchor from '@root/components/atoms/NavigationAnchor';

import Callout from '../atoms/Callout';
import PrincipleBanner from '../organisms/PrincipleBanner';
import toRem from '@root/util/toRem';

// #region Constants & Utilities

const CREATE_PARTY_PATHNAME = '/parties/create';
const SIGN_IN_PATHNAME = `/sign-in?redirect_url=${CREATE_PARTY_PATHNAME}&origin=homepage`;
const SIGN_UP_PATHNAME = `/sign-up?redirect_url=${CREATE_PARTY_PATHNAME}&origin=homepage`;

// #endregion

function PhilosophyBanner(): JSX.Element {
  return (
    <Fragment>
      <SizedBox height={30} />

      <div className="container">
        <SizedBox height={80} />
        <Callout />
        <SizedBox height={80} />

        <NavigationAnchor
          href={CREATE_PARTY_PATHNAME}
          target="_self"
          className="py-3 text-xl font-medium"
          style={{ marginLeft: toRem(32) }}
          tabIndex={1}
        >
          Create a Party 🎉
        </NavigationAnchor>
      </div>
      <PrincipleBanner />
    </Fragment>
  );
}

export default PhilosophyBanner;
