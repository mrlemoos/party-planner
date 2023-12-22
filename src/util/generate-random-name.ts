/**
 * The list of adjectives that will compound the 1st part of the random name.
 */
const adjectives = [
  'happy',
  'jolly',
  'dreamy',
  'sad',
  'angry',
  'pensive',
  'focused',
  'sleepy',
  'grave',
  'dark',
  'lively',
  'witty',
] as const

/**
 * The list of nouns that will compound the 2nd part of the random name.
 */
const nouns = [
  'resonance',
  'cycle',
  'wave',
  'echo',
  'courier',
  'horizon',
  'origin',
  'crest',
  'mirage',
  'harbinger',
  'phantom',
  'shadow',
] as const

/**
 * Generates a random name by combining a random adjective and a random noun, then returns the string.
 *
 * @see {@link adjectives}
 * @see {@link nouns}
 */
function generateRandomName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${adjective}-${noun}`
}

export default generateRandomName
