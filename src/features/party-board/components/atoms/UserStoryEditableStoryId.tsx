import {
  useCallback,
  type JSX,
  type FocusEvent as ReactFocusEvent,
} from 'react';

import type Story from '@root/models/Story';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';

type UserStoryEditableStoryIdProps = Pick<Story, 'storyId'>;

export default function UserStoryEditableStoryId({
  storyId,
}: UserStoryEditableStoryIdProps): JSX.Element {
  const { editStory } = usePartyBoardContext();

  const handleStoryIdChange = useCallback(
    (event: ReactFocusEvent) => {
      const newStoryId = event.target.textContent;

      if (!newStoryId) {
        return;
      }

      editStory(storyId, { storyId: newStoryId });
    },
    [editStory, storyId],
  );

  return (
    <span
      contentEditable={true}
      className="text-sm font-thin text-gray-500 dark:text-gray-700"
      dangerouslySetInnerHTML={{ __html: storyId }}
      onBlur={handleStoryIdChange}
    />
  );
}
