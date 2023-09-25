import { type ReactNode, type JSX, Fragment } from 'react';

import { Metadata } from 'next';
import cls from 'classnames';

import TopBar from '@root/components/molecules/TopBar';
import Footer from '@root/components/atoms/Footer';
import Inter from '@root/styles/Inter';

export const metadata: Metadata = {
  title: 'Party Planner 🎉',
};

interface PartyBoardLayoutParams {
  partyId: string;
}

interface PartyBoardLayoutSearchParams {
  lang?: string;
}

interface PartyBoardLayoutProps {
  children: ReactNode;
  params: PartyBoardLayoutParams;
  searchParams: PartyBoardLayoutSearchParams;
}

const defaultSearchParams: PartyBoardLayoutSearchParams = {
  lang: 'en',
};

export default function PartyBoardLayout({
  children,
  searchParams = defaultSearchParams,
}: PartyBoardLayoutProps): JSX.Element {
  return (
    <html lang={searchParams.lang}>
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
