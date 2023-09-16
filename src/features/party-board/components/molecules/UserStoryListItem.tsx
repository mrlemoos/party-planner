"use client";

import { type JSX, useMemo } from "react";

import cls from "classnames";

import type Story from "@root/models/Story";
import ListItem from "@root/components/atoms/ListItem";
import toRem from "@root/util/toRem";

import isGeneratedStoryId from "../../util/isGeneratedStoryId";
import UserStoryEditableStoryId from "../atoms/UserStoryEditableStoryId";
import UserStoryEditableTitle from "../atoms/UserStoryEditableTitle";
import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";
import UserStoryListItemActions from "../atoms/UserStoryListItemActions";
import UserStoryListItemOrderChevrons from "../atoms/UserStoryListItemOrderChevrons";

// #region Interfaces & Types

type PickedStory = Pick<Story, "storyId" | "title">;

interface UserStoryListItemProps extends PickedStory {
  children?: never;

  isFirstItem: boolean;
  isLastItem: boolean;
}

// #endregion

export default function UserStoryListItem({ storyId, title, isFirstItem, isLastItem }: UserStoryListItemProps): JSX.Element {
  const { isCurrentUserPartyOwner, stories, voteSession } = usePartyBoardContext();

  const isCurrentBeingVotedOn = useMemo(() => voteSession?.currentStoryId === storyId, [voteSession?.currentStoryId, storyId]);

  const computedStory = useMemo(() => stories.find(({ storyId: storyId$ }) => storyId$ === storyId)!, [stories, storyId]);

  return (
    <ListItem
      className={cls(
        "p-1 shadow-md bg-white dark:bg-coal flex justify-between animate-scale-in",
        {
          "rounded-t-md": isFirstItem,
          "rounded-b-md": isLastItem,
        },
        "dark:border-t dark:border-t-purple-300",
        "transition-all",
      )}
      style={{ padding: toRem(12) }}
    >
      <div className='flex items-center gap-6'>
        <div className='w-8'>
          {!isCurrentBeingVotedOn && (
            <UserStoryListItemOrderChevrons
              storyId={storyId}
              isMoveUpActionHidden={isFirstItem}
              isDisabled={voteSession?.status === "Voting"}
            />
          )}
        </div>
        <div className='flex flex-col'>
          <UserStoryEditableTitle storyId={storyId} title={title} />
          {!isGeneratedStoryId(storyId) && <UserStoryEditableStoryId storyId={storyId} />}
        </div>
      </div>
      <div className='flex items-center gap-1'>
        {isCurrentUserPartyOwner && (
          <UserStoryListItemActions computedStory={computedStory} isStoryCurrentlyBeingVotedOn={isCurrentBeingVotedOn} storyId={storyId} />
        )}
      </div>
    </ListItem>
  );
}
