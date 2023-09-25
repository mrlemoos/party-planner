import { type ReactElement, type ReactNode } from 'react';

import { Metadata } from 'next';

import TopBar from '@root/components/molecules/TopBar';
import Inter from '@root/styles/Inter';
import '@root/styles/globals.css';

export const metadata: Metadata = {
  title: 'Party Planner 🎉',
  description: 'Join your scrummates in a party to plan your next sprint!',
};

interface CreatePartyLayoutProps {
  children: ReactNode;

  searchParams?: {
    lang?: string;
  };
}

const CreatePartyLayout = ({
  children,
  searchParams = { lang: 'en' },
}: CreatePartyLayoutProps): ReactElement => (
  <html lang={searchParams.lang}>
    <body className={Inter.className} style={{ width: '100vw' }}>
      <TopBar className="fixed" />
      {children}
    </body>
  </html>
);

export default CreatePartyLayout;
