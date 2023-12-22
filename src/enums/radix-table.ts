/**
 * The Radix table is a table of all the radixes that are used in the project.
 *
 * @see {@link https://en.wikipedia.org/wiki/Radix}
 */
enum RadixTable {
  /**
   * Used internally by nearly all computers. The two digits are "0" and "1", expressed from switches displaying OFF and
   * ON, respectively. Used in most electric counters.
   */
  BINARY = 2,
  /**
   * Used occasionally in computing. The eight digits are "0"–"7" and represent 3 bits (23).
   */
  OCTAL = 8,
  /**
   * Used by humans in the vast majority of cultures. Its ten digits are "0"–"9". Used in most mechanical counters.
   */
  DECIMAL = 10,
  /**
   * Sometimes advocated due to divisibility by 2, 3, 4, and 6. It was traditionally used as part of quantities
   * expressed in dozens and grosses.
   */
  DUODECIMAL = 12,
  /**
   * Often used in computing as a more compact representation of binary (1 hex digit per 4 bits). The sixteen digits are
   * "0"–"9" followed by "A"–"F" or "a"–"f".
   */
  HEXADECIMAL = 16,
  /**
   * Traditional numeral system in several cultures, still used by some for counting. Historically also known as the
   * score system in English, now most famous in the phrase "four score and seven years ago" in the Gettysburg Address.
   */
  VIGESIMAL_SYSTEM = 20,
  /**
   * Originated in ancient Sumer and passed to the Babylonians.[3] Used today as the basis of modern circular coordinate
   * system (degrees, minutes, and seconds) and time measuring (minutes, and seconds) by analogy to the rotation of the
   * Earth.
   */
  SEXAGESIMAL_SYSTEM = 60,
}

export default RadixTable
