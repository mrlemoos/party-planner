import { Fragment, type ReactNode } from "react";

import Link from "next/link";

import Logo from "@root/components/atoms/Logo";
import GradientContainer from "@root/components/molecules/GradientContainer";

interface AuthPageProps {
  children: ReactNode;
}

export default function AuthPage({ children }: AuthPageProps): JSX.Element {
  return (
    <Fragment>
      <div className='fixed right-10 top-8'>
        <Link href='/' target='_self'>
          <Logo isInteractive={true} />
        </Link>
      </div>
      <GradientContainer>{children}</GradientContainer>
    </Fragment>
  );
}
