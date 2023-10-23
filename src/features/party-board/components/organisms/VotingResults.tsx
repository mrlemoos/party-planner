'use client';

import {
  useMemo,
  type JSX,
  useState,
  useCallback,
  type ComponentProps,
  type CSSProperties,
  Fragment,
} from 'react';

import Accordion from '@root/components/atoms/Accordion';
import Heading from '@root/components/atoms/Heading';
import getVotesSummaryPerStory from '@root/util/getVotesSummaryPerStory';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';

type AccordionProps = NonNullable<ComponentProps<typeof Accordion>>;
type AccordionFocusChangeEventHandler = NonNullable<
  AccordionProps['onFocusChange']
>;

const asideStyle: CSSProperties = {
  maxWidth: 800,
  minWidth: 500,
};

export default function VotingResults(): JSX.Element {
  const { stories, members } = usePartyBoardContext();

  const votesSummaryPerStory = useMemo(
    () => getVotesSummaryPerStory(stories, members),
    [stories, members],
  );
  const hasVoteStarted = useMemo(
    () => votesSummaryPerStory.length > 0,
    [votesSummaryPerStory.length],
  );

  const [currentAccordionItem, setCurrentAccordionItem] = useState(
    stories[0]?.storyId,
  );

  const handleFocusChange = useCallback<AccordionFocusChangeEventHandler>(
    ({ rawValue }) => setCurrentAccordionItem(rawValue),
    [],
  );

  return (
    <aside
      className="mr-4 flex h-full flex-col justify-center p-6"
      style={asideStyle}
    >
      {hasVoteStarted ? (
        <div>
          {votesSummaryPerStory.map(({ storyId, title, votesWithMember }) => (
            <div key={storyId} className="flex flex-col gap-2">
              <Accordion
                value={currentAccordionItem}
                onFocusChange={handleFocusChange}
                isCollapsible={true}
                items={[
                  {
                    key: storyId,
                    header: title,
                    content: (
                      <div className="flex flex-col gap-2">
                        {votesWithMember.length ? (
                          votesWithMember.map(({ memberDisplayName, vote }) => (
                            <span key={memberDisplayName}>
                              <b>{memberDisplayName}</b> has voted <b>{vote}</b>
                            </span>
                          ))
                        ) : (
                          <span>This story has not been voted yet.</span>
                        )}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ))}
        </div>
      ) : (
        <Heading level="h5" className="text-center font-normal text-gray-500">
          The vote summary will be displayed here once the vote has started. 🚀
        </Heading>
      )}
    </aside>
  );
}
