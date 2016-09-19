'use strict';

import runSafe from '../../common/runSafe';
import {NativeModules} from 'react-native';

export const SHOW_MUSIC_PLAYER = 'SHOW_MUSIC_PLAYER';
export const showMusicPlayer = (show) => {
  return {
    type: SHOW_MUSIC_PLAYER,
    showMusicPlayer: show,
  };
};

export const PLAY_NEW_MUSIC = 'PLAY_NEW_MUSIC';

const dispatchPlayNewMusic = (name, duration) => {
  return {
    type: PLAY_NEW_MUSIC,
    currentMusicDuration: duration,
    currentMusic: name,
    isPlaying: true,
  };
};

export const playNewMusic = (path, name) => {
  return dispatch => {
    return runSafe(function *() {
      const result = yield NativeModules.MusicPlayer.playNewMusic(path);

      const durationInSeconds = parseInt(parseInt(result.duration, 10) / 1000, 10);
      const minutes = parseInt(durationInSeconds / 60, 10);
      const seconds = parseInt(durationInSeconds % 60, 10);

      const secondsString = seconds < 10 ? `0${seconds}` : seconds;
      const durationString = `${minutes}:${secondsString}`;

      dispatch(dispatchPlayNewMusic(name, durationString));
    });
  }
};

export const PLAY_FROM_BEGINNING = 'PLAY_FROM_BEGINNING';

const dispatchPlayFromBeginning = () => {
  return {
    type: PLAY_FROM_BEGINNING,
  };
};

export const playFromBeginning = () => {
  return dispatch => {
    NativeModules.MusicPlayer.playFromBeginning();
    dispatch(dispatchPlayFromBeginning());
  }
};

export const PAUSE_CURRENT_MUSIC = 'PAUSE_CURRENT_MUSIC';

const dispatchPauseCurrentMusic = () => {
  return {
    type: PAUSE_CURRENT_MUSIC,
    isPlaying: false,
  };
};

export const pauseCurrentMusic = () => {
  return dispatch => {
    return runSafe(function *() {
      NativeModules.MusicPlayer.pauseCurrentMusic();
      dispatch(dispatchPauseCurrentMusic());
    });
  }
};

export const PLAY_CURRENT_MUSIC = 'PLAY_CURRENT_MUSIC';

const dispatchPlayCurrentMusic = () => {
  return {
    type: PLAY_CURRENT_MUSIC,
    isPlaying: true,
  };
};

export const playCurrentMusic = () => {
  return dispatch => {
    return runSafe(function *() {
      NativeModules.MusicPlayer.playCurrentMusic();
      dispatch(dispatchPlayCurrentMusic());
    });
  }
};

