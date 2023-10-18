import { Fragment, type JSX } from 'react';

import TopBar from '@root/components/molecules/TopBar';
import Homepage from '@root/features/homepage/Homepage';
// import TextAnchor from "@root/components/atoms/TextAnchor";

function RootPage(): JSX.Element {
  return (
    <Fragment>
      <TopBar>
        {/* <div className="flex flex-row justify-between items-center gap-6">
          <TextAnchor
            href="/pricing"
            target="_self"
            className="bg-white dark:bg-black rounded-t-md"
          >
            Pricing
          </TextAnchor>
          <TextAnchor
            href="/contacts"
            target="_self"
            className="bg-white dark:bg-black rounded-t-md"
          >
            Contact
          </TextAnchor>
        </div> */}
      </TopBar>

      <Homepage />
    </Fragment>
  );
}

export default RootPage;
