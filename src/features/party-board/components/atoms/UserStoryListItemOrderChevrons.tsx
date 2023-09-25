import { useCallback, type JSX } from 'react';

import { ChevronUpIcon } from '@radix-ui/react-icons';
import cls from 'classnames';

import Tooltip from '@root/components/atoms/Tooltip';
import IconButton from '@root/components/atoms/IconButton';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';

interface UserStoryListItemOrderChevronsProps {
  storyId: string;
  isMoveUpActionHidden?: boolean;
  isDisabled: boolean;
}

export default function UserStoryListItemOrderChevrons({
  storyId,
  isMoveUpActionHidden,
  isDisabled,
}: UserStoryListItemOrderChevronsProps): JSX.Element {
  const { rewriteStories, stories, voteSession, createVoteSession, partyId } =
    usePartyBoardContext();

  const handleMoveToTop = useCallback(
    function handleMoveToTop$() {
      if (isMoveUpActionHidden || isDisabled) {
        return;
      }

      const newStories = [
        ...stories.sort(({ storyId: storyId$ }) =>
          storyId$ === storyId ? -1 : 0,
        ),
      ];

      if (
        // If the vote session status is "Not Started", the story is not the
        // current story, the story is first story on the list.
        voteSession?.status === 'Not Started' &&
        voteSession?.currentStoryId !== storyId &&
        newStories[0].storyId === storyId
      ) {
        createVoteSession(partyId, storyId, 'Not Started');
      }

      rewriteStories(newStories);
    },
    [
      isMoveUpActionHidden,
      isDisabled,
      stories,
      voteSession?.currentStoryId,
      voteSession?.status,
      storyId,
      rewriteStories,
      createVoteSession,
      partyId,
    ],
  );

  return (
    <div
      className={cls('flex flex-col items-center', {
        'opacity-50 pointer-events-none': isDisabled,
      })}
    >
      {!isMoveUpActionHidden && (
        <Tooltip content={<span>Move to the top</span>} delayDuration={3}>
          <div>
            <IconButton
              className="cursor-pointer"
              onClick={handleMoveToTop}
              aria-label="Move to top"
              icon={<ChevronUpIcon height={18} width={18} />}
              alt="Move this User Story to the top of the list."
            />
          </div>
        </Tooltip>
      )}
    </div>
  );
}
