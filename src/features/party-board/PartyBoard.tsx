'use client';

import { useMemo, type JSX, Fragment } from 'react';

import useWindowSize from '@root/hooks/useWindowSize';
import type Party from '@root/models/Party';
import BlurryOverlay from '@root/components/molecules/BlurryOverlay';
import SizedBox from '@root/components/atoms/SizedBox';
import Skeleton from '@root/components/atoms/Skeleton';
import Pulse from '@root/components/atoms/Pulse';

import usePartyRealtime from './hooks/usePartyRealtime';
import UserStoryList from './components/organisms/UserStoryList';
import ConnectedMembers from './components/molecules/ConnectedMembers';
import VotingSessionSummary from './components/molecules/VotingSessionSummary';
import PartyBoardProvider from './providers/PartyBoardProvider';
import VotingResults from './components/organisms/VotingResults';
import VotingBoard from './components/organisms/VotingBoard';
import StartVote from './components/organisms/StartVote';
import Timer from './components/atoms/Timer';

type PartyBoardProps = Pick<Party, 'partyId'>;

export default function PartyBoard({ partyId }: PartyBoardProps): JSX.Element {
  const { voteSession, isLoading, ...realtime } = usePartyRealtime(partyId);

  const { width } = useWindowSize();

  const shouldShowVotingBoard = useMemo(
    () =>
      typeof voteSession?.currentStoryId === 'string' &&
      voteSession?.status === 'Voting',
    [voteSession?.currentStoryId, voteSession?.status],
  );
  const shouldShowStartVote = useMemo(
    () => voteSession?.status === 'Not Started',
    [voteSession?.status],
  );

  const shouldShowVotingSessionSummary = useMemo(
    () => voteSession?.status === 'Revealing',
    [voteSession?.status],
  );

  return (
    <Fragment>
      {isLoading && <BlurryOverlay />}
      <PartyBoardProvider
        {...realtime}
        isLoading={isLoading}
        voteSession={voteSession}
      >
        <SizedBox height={30} />

        <ConnectedMembers />
        {!isLoading && <Timer />}

        <div className="container mx-auto">
          <div className="flex flex-col gap-8">
            {isLoading ? (
              <Pulse>
                <Skeleton
                  style={{ height: 400, width: '100%' }}
                  className="rounded-xl"
                />
              </Pulse>
            ) : (
              <Fragment>
                {shouldShowStartVote && <StartVote />}
                {shouldShowVotingBoard && (
                  <VotingBoard storyId={voteSession!.currentStoryId} />
                )}
                {shouldShowVotingSessionSummary && <VotingSessionSummary />}
              </Fragment>
            )}
            <SizedBox height={64} />
            <div
              className="flex gap-3"
              style={{ flexDirection: width < 1000 ? 'column' : 'row' }}
            >
              <div className="flex-1 gap-5">
                {isLoading ? (
                  <Pulse>
                    <Skeleton
                      style={{ height: 420, width: '100%' }}
                      className="rounded-lg"
                    />
                  </Pulse>
                ) : (
                  <UserStoryList />
                )}
              </div>
              <div>
                {isLoading ? (
                  <Pulse>
                    <Skeleton
                      style={{ height: 300, minWidth: 500 }}
                      className="rounded-lg"
                    />
                  </Pulse>
                ) : (
                  <VotingResults />
                )}
              </div>
            </div>
          </div>
        </div>
      </PartyBoardProvider>
    </Fragment>
  );
}
