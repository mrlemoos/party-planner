import UppercaseLetters from '@root/constants/UppercaseLetters';
import LowercaseLetters from '@root/constants/LowercaseLetters';
import Digits from '@root/constants/Digits';

const $characters = [UppercaseLetters, LowercaseLetters, Digits].join('');
const $defaultLength = 32;

function $randomCharacter(): string {
  const randomIndex = Math.floor(Math.random() * $characters.length);
  return $characters.charAt(randomIndex);
}

function $getFixedLengthArray(length: number): number[] {
  return Array.from(Array(length).keys());
}

export default function uuid(length = $defaultLength): string {
  return $getFixedLengthArray(length).map($randomCharacter).join('');
}
