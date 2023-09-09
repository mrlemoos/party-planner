import { useCallback, type JSX, type FocusEvent as ReactFocusEvent } from "react";

import type Story from "@root/models/Story";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";

type UserStoryEditableTitleProps = Pick<Story, "title" | "storyId">;

export default function UserStoryEditableTitle({ title, storyId }: UserStoryEditableTitleProps): JSX.Element {
  const { editStory } = usePartyBoardContext();

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
    <span
      className="font-normal flex-1"
      contentEditable={true}
      onBlur={handleTitleChange}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
}
