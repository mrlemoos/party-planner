import { type ReactNode, type JSX } from 'react';

import cls from 'classnames';

import Inter from '@root/styles/Inter';

interface JoinPartyLayoutProps {
  children: ReactNode;
}

function JoinPartyLayout({ children }: JoinPartyLayoutProps): JSX.Element {
  return (
    <html>
      <body className={cls(Inter.className, 'h-screen min-h-screen')}>
        {children}
      </body>
    </html>
  );
}

export default JoinPartyLayout;
