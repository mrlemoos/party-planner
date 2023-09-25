export default function isInt(n: unknown): n is number {
  try {
    return Number.isInteger(typeof n === 'number' ? n : Number(n));
  } catch {
    return false;
  }
}
