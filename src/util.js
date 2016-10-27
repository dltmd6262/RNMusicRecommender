export const milliToTimeString = (time) => {
  const durationInSeconds = parseInt(parseInt(time, 10) / 1000, 10);
  const minutes = parseInt(durationInSeconds / 60, 10);
  const seconds = parseInt(durationInSeconds % 60, 10);

  const secondsString = seconds < 10 ? `0${seconds}` : seconds;
  const durationString = `${minutes}:${secondsString}`;

  return durationString;
};