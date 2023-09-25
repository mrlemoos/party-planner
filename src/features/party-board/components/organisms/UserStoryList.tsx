'use client';

import { useMemo, type JSX, useState, useCallback } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';
import cls from 'classnames';

import Button from '@root/components/atoms/Button';
import Heading from '@root/components/atoms/Heading';
import TextButton from '@root/components/atoms/TextButton';
import Tooltip from '@root/components/atoms/Tooltip';
import toRem from '@root/util/toRem';
import Poppins from '@root/styles/Poppins';
import type Story from '@root/models/Story';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';
import generateStoryId from '../../util/generateStoryId';
import UserStoryListEmptyState from '../molecules/UserStoryListEmptyState';
import UserStoryListItem from '../molecules/UserStoryListItem';

import AddUserStoryForm from './AddUserStoryForm';

export default function UserStoryList(): JSX.Element {
  const { stories, addStory } = usePartyBoardContext();
  const hasStories = useMemo(() => stories.length > 0, [stories.length]);

  const [isAddingUserStory, setAddingUserStory] = useState(false);
  const handleAddUserStory = useCallback(() => setAddingUserStory(true), []);

  const handleAddUserStorySubmit = useCallback(
    ({ storyId: storyId$, title }: Pick<Story, 'storyId' | 'title'>) => {
      const storyId = storyId$ || generateStoryId();
      const story: Story = {
        isRevealed: false,
        storyId,
        title,
        votes: {},
      };

      addStory(story);
    },
    [addStory],
  );

  return (
    <div
      className="bg-gray-100 dark:bg-coal shadow-lg rounded-xl flex flex-col"
      style={{ padding: toRem(8) }}
    >
      <div className="flex flex-col">
        {isAddingUserStory && (
          <AddUserStoryForm onSubmit={handleAddUserStorySubmit} />
        )}
        {hasStories ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Heading
                level="h3"
                className={cls(
                  'text-xl font-medium select-none ml-6',
                  Poppins.className,
                )}
              >
                User Stories
              </Heading>
              <Tooltip
                content={<span>Add User Story</span>}
                sideOffset={-10}
                side="left"
              >
                <div>
                  <TextButton
                    onClick={handleAddUserStory}
                    className="text-2xl"
                    aria-label="Add User Story"
                  >
                    <PlusIcon />
                  </TextButton>
                </div>
              </Tooltip>
            </div>
            <ul className="flex flex-col">
              {stories.map(({ storyId, title }, index, { length }) => {
                const isFirstItem = index === 0;
                const isLastItem = length - 1 === index;

                return (
                  <UserStoryListItem
                    key={storyId}
                    storyId={storyId}
                    title={title}
                    isFirstItem={isFirstItem}
                    isLastItem={isLastItem}
                  />
                );
              })}
            </ul>
          </div>
        ) : (
          <UserStoryListEmptyState
            callToAction={
              <Button className="mb-3" onClick={handleAddUserStory}>
                Add a story
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
