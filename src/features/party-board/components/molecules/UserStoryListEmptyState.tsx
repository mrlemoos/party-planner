'use client';

import {
  type ReactNode,
  type JSX,
  isValidElement,
  useMemo,
  Fragment,
} from 'react';

import { useUser } from '@clerk/nextjs';
import cls from 'classnames';

import Poppins from '@root/styles/Poppins';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';

interface UserStoryListEmptyStateProps {
  callToAction: ReactNode;
  className?: string;
}

export default function UserStoryListEmptyState({
  callToAction,
  className,
}: UserStoryListEmptyStateProps): JSX.Element {
  const { user, isSignedIn } = useUser();
  const { ownerUserId } = usePartyBoardContext();

  const isOwner = useMemo(
    () => isSignedIn && user?.id === ownerUserId,
    [ownerUserId, user?.id, isSignedIn],
  );

  const hasCallToAction = isValidElement(callToAction);

  return (
    <div
      className={cls(
        'flex flex-col justify-center items-center gap-6 p-3',
        className,
      )}
      style={{ minHeight: 400 }}
    >
      <h3
        className={cls(
          'inline-block font-bold text-xl select-none',
          Poppins.className,
        )}
      >
        There are no user stories yet 😢
      </h3>
      {isOwner ? (
        <Fragment>
          {hasCallToAction && (
            <span className={cls('text-gray-500 text-sm select-none')}>
              Click on the button below to add user stories.
            </span>
          )}
          {callToAction}
        </Fragment>
      ) : (
        <span className={cls('text-gray-500 text-sm select-none')}>
          The party owner has not added any user stories yet. Maybe you should
          get a hot cup of coffee ☕️
        </span>
      )}
    </div>
  );
}
