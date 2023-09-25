import { type ReactNode, type JSX } from 'react';

import cls from 'classnames';

import Inter from '@root/styles/Inter';

interface JoinPartySearchParams {
  lang?: string;
}

// This is commented out because it is not used in this file, but it is used
// in the page.tsx server component.
// interface JoinPartyParams {
//   partyId: string;
// }

interface JoinPartyLayoutProps {
  children: ReactNode;
  searchParams?: JoinPartySearchParams;
  // params?: JoinPartyParams;
}

const defaultSearchParams: JoinPartySearchParams = {
  lang: 'en',
};

function JoinPartyLayout({
  children,
  searchParams = defaultSearchParams,
}: JoinPartyLayoutProps): JSX.Element {
  return (
    <html lang={searchParams.lang}>
      <body className={cls(Inter.className, 'h-screen min-h-screen')}>
        {children}
      </body>
    </html>
  );
}

export default JoinPartyLayout;
