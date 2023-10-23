import { Fragment, type HTMLAttributes, type ReactNode } from 'react';

import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import cls from 'classnames';
import Link from 'next/link';

import Logo from '@root/components/atoms/Logo';
import NavigationAnchor from '@root/components/atoms/NavigationAnchor';
import OpaqueButton from '../atoms/OpaqueButton';

interface TopBarProps extends HTMLAttributes<HTMLDivElement> {
  navigation?: ReactNode;
  beforeLogo?: ReactNode;
  afterLogo?: ReactNode;

  containerClassName?: string;
  headerClassName?: string;
  navClassName?: string;
}

async function TopBar({
  navigation,
  className,
  beforeLogo,
  afterLogo,
  containerClassName,
  headerClassName,
  navClassName,
  children,
  ...props
}: TopBarProps): Promise<JSX.Element> {
  const user = await currentUser();

  const isUserLoggedIn =
    Array.isArray(user?.emailAddresses) &&
    typeof user?.emailAddresses?.length === 'number' &&
    user.emailAddresses.length > 0;

  return (
    <div className={cls('sticky top-4 z-30 h-14', className)} {...props}>
      <div className={cls('container mx-auto', containerClassName)}>
        <header
          className={cls(
            'sticky top-4 mt-4 flex items-center justify-between rounded-xl border-[1px] border-gray-100 py-2 pl-4 pr-2 shadow-xl backdrop-blur-lg dark:border-light-coal dark:shadow-md',
            headerClassName,
          )}
        >
          <div className="flex items-center gap-2">
            {beforeLogo}
            <Link href="/">
              <Logo className="mr-4" isMinimum={true} />
            </Link>
            {afterLogo}
          </div>

          {children}

          <nav className={cls('align-items flex gap-2', navClassName)}>
            {isUserLoggedIn ? (
              <Fragment>
                <NavigationAnchor href="/parties/create">
                  Create a Party
                </NavigationAnchor>
              </Fragment>
            ) : (
              <SignInButton>
                <OpaqueButton>Create a Party</OpaqueButton>
              </SignInButton>
            )}

            {navigation}

            {isUserLoggedIn && (
              <div className="mx-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </nav>
        </header>
      </div>
    </div>
  );
}

export default TopBar;
