export default function isInt(n: unknown): n is number {
  try {
    return Number.isInteger(n);
  } catch {
    return false;
  }
}
