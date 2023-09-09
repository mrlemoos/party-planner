export default function parseJSONOrReturn<T>(json: string, orReturn: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return orReturn;
  }
}
