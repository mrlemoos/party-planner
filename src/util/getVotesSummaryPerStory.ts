import type Story from '@root/models/Story';
import type PartyMember from '@root/models/PartyMember';

/**
 * Returns an array of objects containing the storyId, title and votes of each
 * story.
 *
 * @see {@link Story}
 * @see {@link PartyMember}
 */
export default function getVotesSummaryPerStory(
  stories: Story[],
  partyMembers: PartyMember[],
) {
  const votesPerStory = stories.map(({ isRevealed, storyId, votes, title }) => {
    if (!isRevealed || typeof votes !== 'object') {
      return {
        storyId,
        title,
        votesWithMember: [],
      };
    }

    const votesWithMember = Object.entries(votes).map(([memberId, vote]) => {
      const memberDisplayName = partyMembers.find(
        ({ userId }) => userId === memberId,
      )?.displayName;

      return {
        memberDisplayName,
        vote,
      };
    });

    return {
      storyId,
      title,
      votesWithMember,
    };
  });

  return votesPerStory;
}
