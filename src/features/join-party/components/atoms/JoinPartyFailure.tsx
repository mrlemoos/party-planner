import { type JSX } from 'react';

import { ReloadIcon } from '@radix-ui/react-icons';
import {
  useSearchParams,
  type ReadonlyURLSearchParams,
  usePathname,
} from 'next/navigation';
import Link from 'next/link';
import cls from 'classnames';

import ErrorBox from '@root/components/atoms/ErrorBox';
import RedirectReasons from '@root/constants/RedirectReasons';
import isInt from '@root/util/isInt';

// #region Interfaces & Types

interface JoinPartyFailureProps {
  error?: string;
}

// #endregion

// #region Constants & Utilities

function $getRetryReference(
  initialSearchParams: ReadonlyURLSearchParams,
  pathname: string,
): string {
  const retry$ = initialSearchParams.get('retry');

  if (isInt(retry$)) {
    if (retry$ === '3') {
      // If the user has already retried 3 times, we redirect them to the root
      // page. This is to prevent infinite redirects or bots from spamming the
      // server.

      const rootSearchParams = new URLSearchParams();
      rootSearchParams.set(
        'redirectReason',
        RedirectReasons.MaximumJoinRetriesReached,
      );
      rootSearchParams.set('from', pathname);
      rootSearchParams.set('lang', initialSearchParams.get('lang') || 'en');

      return `/?${rootSearchParams.toString()}`;
    }

    const retry = parseInt(retry$, 10) + 1;
    const searchParams = new URLSearchParams(initialSearchParams);
    searchParams.set('retry', retry.toString());

    return `${pathname}?${searchParams.toString()}`;
  }

  const searchParams = new URLSearchParams(initialSearchParams);
  searchParams.set('retry', '1');

  return `${pathname}?${searchParams.toString()}`;
}

// #endregion

function JoinPartyFailure({
  error,
}: JoinPartyFailureProps): JSX.Element | null {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (!error) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-9/12 my-4 animate-scale-in-content">
      <ErrorBox
        error={error}
        hasBackButton={false}
        footer={
          <div className="flex flex-col justify-center items-center gap-3 mt-4">
            <Link
              href={$getRetryReference(searchParams, pathname)}
              target="_self"
              className={cls(
                'font-medium px-4 py-2 rounded-lg transition-all',
                'flex items-center justify-center gap-2',
                'border-2 border-solid',
                'bg-red-100 text-red-900 border-red-100',
                'dark:bg-coal dark:text-white dark:border-coal',
              )}
            >
              <ReloadIcon />
              Retry
            </Link>
            <Link href="/" target="_self" className="text-gray-500 mt-6">
              Back to home
            </Link>
          </div>
        }
      />
    </div>
  );
}

export default JoinPartyFailure;
