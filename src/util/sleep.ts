function $convertPropToMilliseconds({ seconds, milliseconds }: SleepProps) {
  if (typeof seconds === 'number') {
    return seconds * 1000;
  }

  if (typeof milliseconds === 'number') {
    return milliseconds;
  }
}

type SleepProps = {
  milliseconds?: number;
  seconds?: number;
};

export default function sleep(param: number | SleepProps) {
  const milliseconds =
    typeof param === 'number' ? param : $convertPropToMilliseconds(param);
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
