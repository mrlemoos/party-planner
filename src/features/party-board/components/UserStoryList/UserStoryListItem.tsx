"use client";

import { useCallback, type JSX, type FocusEvent as ReactFocusEvent } from "react";

import cls from "classnames";

import type Story from "@root/models/Story";
import ListItem from "@root/components/atoms/ListItem";
import TextButton from "@root/components/atoms/TextButton";
import Tooltip from "@root/components/atoms/Tooltip";
import toRem from "@root/util/toRem";

import isGeneratedStoryId from "../../util/isGeneratedStoryId";
import UserStoryEditableStoryId from "./UserStoryEditableStoryId";
import UserStoryEditableTitle from "./UserStoryEditableTitle";

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
  return (
    <ListItem
      className={cls("p-1 shadow-md bg-white dark:bg-coal flex justify-between animate-scale-in", {
        "rounded-t-md": isFirstItem,
        "rounded-b-md": isLastItem,
      })}
      style={{ padding: toRem(12) }}
    >
      <div className="flex items-center gap-6">
        {!isGeneratedStoryId(storyId) && <UserStoryEditableStoryId storyId={storyId} />}
        <UserStoryEditableTitle storyId={storyId} title={title} />
      </div>
      <TextButton>Vote</TextButton>
    </ListItem>
  );
}
