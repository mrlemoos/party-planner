interface GetDaysInMillisecondsOptions {
  from: number;
}

export default function getDaysInMilliseconds(
  days: number,
  { from }: GetDaysInMillisecondsOptions = { from: Date.now() }
) {
  return days * 1000 * 60 * 60 * 24 + from;
}
