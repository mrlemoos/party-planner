import { type ReactNode, type JSX, Fragment } from 'react';

import { Metadata } from 'next';
import cls from 'classnames';

import TopBar from '@root/components/molecules/TopBar';
import Footer from '@root/components/atoms/Footer';
import Inter from '@root/styles/Inter';

// #region Types & interfaces

interface PartyBoardLayoutProps {
  children: ReactNode;
}

// #endregion

// #region Constants

export const metadata: Metadata = {
  title: 'Party Planner 🎉',
};

// #endregion

function PartyBoardLayout({ children }: PartyBoardLayoutProps): JSX.Element {
  return (
    <html>
      <body className={cls(Inter.className, 'w-screen')}>
        <Fragment>
          <TopBar />
          {children}
          <Footer />
        </Fragment>
      </body>
    </html>
  );
}

export default PartyBoardLayout;
