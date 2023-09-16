interface GetDaysInMillisecondsOptions {
  from?: number;
}

function getDaysInMilliseconds(
  days: number,
  options?: GetDaysInMillisecondsOptions
) {
  const from = options?.from ?? Date.now();

  return days * 1000 * 60 * 60 * 24 + from;
}

export default getDaysInMilliseconds;