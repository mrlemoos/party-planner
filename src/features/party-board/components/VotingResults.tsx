"use client";

import { useMemo, type JSX, useState, useCallback, type ComponentProps } from "react";

import Accordion from "@root/components/atoms/Accordion";
import Heading from "@root/components/atoms/Heading";
import getVotesSummaryPerStory from "@root/util/getVotesSummaryPerStory";

import usePartyBoardContext from "../context-hooks/usePartyBoardContext";

type AccordionFocusChangeEventHandler = NonNullable<ComponentProps<typeof Accordion>["onFocusChange"]>;

export default function VotingResults(): JSX.Element {
  const { stories, members } = usePartyBoardContext();

  const votesSummaryPerStory = useMemo(() => getVotesSummaryPerStory(stories, members), [stories, members]);
  const hasVoteStarted = useMemo(() => votesSummaryPerStory.length > 0, [votesSummaryPerStory.length]);

  const [currentAccordionItem, setCurrentAccordionItem] = useState(stories[0]?.storyId);

  const handleFocusChange = useCallback<AccordionFocusChangeEventHandler>(function handleFocusChange$({ rawValue }) {
    setCurrentAccordionItem(rawValue);
  }, []);

  return (
    <aside className="flex flex-col justify-center h-full p-6" style={{ maxWidth: 800, minWidth: 500 }}>
      <Heading level="h4">Results</Heading>
      {hasVoteStarted ? (
        <div>
          {votesSummaryPerStory.map(({ storyId, title, votesWithMember }) => (
            <div key={storyId} className="flex flex-col gap-2">
              <Accordion
                value={currentAccordionItem}
                onFocusChange={handleFocusChange}
                items={[
                  {
                    key: storyId,
                    header: title,
                    content: (
                      <div className="flex flex-col gap-2">
                        {votesWithMember.map(({ memberDisplayName, vote }) => (
                          <span key={memberDisplayName}>
                            <b>{memberDisplayName}</b> has voted <b>{vote}</b>
                          </span>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ))}
        </div>
      ) : (
        <Heading level="h5" className="text-gray-500 font-normal text-center">
          The vote summary will be displayed here once the vote has started. 🚀
        </Heading>
      )}
    </aside>
  );
}
