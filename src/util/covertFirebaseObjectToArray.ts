export default function convertFirebaseObjectToArray<T extends object>(
  data: T,
) {
  const converted = [];
  for (const [, value] of Object.entries(data)) {
    converted.push(value);
  }
  return converted;
}
