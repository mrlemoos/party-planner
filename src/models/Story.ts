export default interface Story {
  storyId: string;
  title: string;
  description?: string;
  votes: Record<string, number>; // userId -> vote
  isRevealed: boolean;
}
