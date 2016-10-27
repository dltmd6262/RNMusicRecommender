import c from './constants';

export const milliToTimeString = (time) => {
  const durationInSeconds = parseInt(parseInt(time, 10) / 1000, 10);
  const minutes = parseInt(durationInSeconds / 60, 10);
  const seconds = parseInt(durationInSeconds % 60, 10);

  const secondsString = seconds < 10 ? `0${seconds}` : seconds;
  const durationString = `${minutes}:${secondsString}`;

  return durationString;
};

export const getNextRepeatMode = (mode) => {
  switch(mode) {
    case c.RepeatModes.None:
      return c.RepeatModes.All;
    case c.RepeatModes.All:
      return c.RepeatModes.One;
    case c.RepeatModes.One:
      return c.RepeatModes.None;
    default:
      return c.RepeatModes.None;
  }
};
