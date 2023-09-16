import { type HTMLAttributes, type ReactNode } from "react";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import cls from "classnames";
import Link from "next/link";

import NavigationAnchor from "@root/components/atoms/NavigationAnchor";
import Logo from "@root/components/atoms/Logo";

interface TopBarProps extends HTMLAttributes<HTMLDivElement> {
  navigation?: ReactNode;
  beforeLogo?: ReactNode;
  afterLogo?: ReactNode;

  containerClassName?: string;
  headerClassName?: string;
  navClassName?: string;
}

function TopBar({
  navigation,
  className,
  beforeLogo,
  afterLogo,
  containerClassName,
  headerClassName,
  navClassName,
  children,
  ...props
}: TopBarProps): JSX.Element {
  return (
    <div className={cls("top-4 z-30 sticky h-14", className)} {...props}>
      <div className={cls("container mx-auto", containerClassName)}>
        <header
          className={cls(
            "flex justify-between items-center pl-4 pr-2 py-2 shadow-xl rounded-xl backdrop-blur-lg sticky top-4 mt-4 border-[1px] border-gray-100 dark:border-gray-900",
            headerClassName,
          )}
        >
          <div className='flex items-center gap-2'>
            {beforeLogo}
            <Link href='/'>
              <Logo className='mr-4' isMinimum={true} />
            </Link>
            {afterLogo}
          </div>

          {children}

          <nav className={cls("flex align-items gap-2", navClassName)}>
            <NavigationAnchor href='/parties/create'>Create a Party</NavigationAnchor>

            {navigation}

            <SignedOut>
              <NavigationAnchor href='/sign-in'>Sign in</NavigationAnchor>
            </SignedOut>
            <SignedIn>
              <div className='mx-2'>
                <UserButton afterSignOutUrl='/parties/create' />
              </div>
            </SignedIn>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default TopBar;
