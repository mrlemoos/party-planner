"use client";

import { useCallback, type JSX, type FocusEvent as ReactFocusEvent } from "react";

import cls from "classnames";

import type Story from "@root/models/Story";
import ListItem from "@root/components/atoms/ListItem";
import TextButton from "@root/components/atoms/TextButton";
import toRem from "@root/util/toRem";

import isGeneratedStoryId from "../../util/isGeneratedStoryId";
import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";

type UserStoryListItemProps = Pick<Story, "storyId" | "title"> & {
  children?: never;

  isFirstItem?: boolean;
  isLastItem?: boolean;
};

export default function UserStoryListItem({
  storyId,
  title,
  isFirstItem,
  isLastItem,
}: UserStoryListItemProps): JSX.Element {
  const { editStory } = usePartyBoardContext();

  const handleStoryIdChange = useCallback(
    (event: ReactFocusEvent) => {
      const newStoryId = event.target.textContent;

      if (!newStoryId) {
        return;
      }

      editStory(storyId, { storyId: newStoryId });
    },
    [editStory, storyId]
  );

  const handleTitleChange = useCallback(
    (event: ReactFocusEvent) => {
      const newTitle = event.target.textContent;

      if (!newTitle) {
        return;
      }

      editStory(storyId, { title: newTitle });
    },
    [editStory, storyId]
  );

  return (
    <ListItem
      className={cls("p-1 shadow-md bg-white dark:bg-coal flex justify-between animate-scale-in", {
        "rounded-t-md": isFirstItem,
        "rounded-b-md": isLastItem,
      })}
      style={{ padding: toRem(12) }}
    >
      <div className="flex items-center gap-6">
        {!isGeneratedStoryId(storyId) && (
          <span
            className="text-gray-500 dark:text-gray-700 text-sm font-thin"
            contentEditable={true}
            onBlur={handleStoryIdChange}
            dangerouslySetInnerHTML={{ __html: storyId }}
          />
        )}
        <span
          className="font-normal flex-1"
          contentEditable={true}
          onBlur={handleTitleChange}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <TextButton>Vote</TextButton>
    </ListItem>
  );
}
