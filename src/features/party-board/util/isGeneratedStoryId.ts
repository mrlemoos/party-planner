export default function isGeneratedStoryId(storyId: string) {
  return storyId.startsWith("$$story$$__");
}
