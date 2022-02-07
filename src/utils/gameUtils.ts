export function convertTimeToPercent(value: number) {
  const fullPercents = 100;
  const secondsInMinute = 60;
  return Math.round(value * (fullPercents / secondsInMinute));
}

export function lol() {
  return 42;
}
