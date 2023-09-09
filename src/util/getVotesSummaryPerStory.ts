import type Story from "@root/models/Story";
import type PartyMember from "@root/models/PartyMember";

/**
 * Returns an array of objects containing the storyId, title and votes of each story.
 *
 * @param {Story[]} stories - The stories to get the votes summary from.
 * @param {PartyMember[]} partyMembers - The party members to get the display name from.
 *
 * @returns {Object[]} An array of objects containing the storyId, title and votes of each story.
 */
export default function getVotesSummaryPerStory(stories: Story[], partyMembers: PartyMember[]) {
  const votesPerStory = stories.map(({ isRevealed, storyId, votes, title }) => {
    if (!isRevealed) {
      return {
        storyId,
        title,
        votesWithMember: [],
      };
    }

    const votesWithMember = Object.entries(votes).map(([memberId, vote]) => {
      const memberDisplayName = partyMembers.find(({ userId }) => userId === memberId)?.displayName;

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
