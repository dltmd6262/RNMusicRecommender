'use strict';

import co from 'co';
import {NativeModules} from 'react-native';

export const SHOW_MUSIC_PLAYER = 'SHOW_MUSIC_PLAYER';
export const showMusicPlayer = (show) => {
  return {
    type: SHOW_MUSIC_PLAYER,
    showMusicPlayer: show,
  };
};

export const PLAY_NEW_MUSIC = 'PLAY_NEW_MUSIC';

const dispatchPlayNewMusic = (name) => {
  return {
    type: PLAY_NEW_MUSIC,
    currentMusic: name,
    isPlaying: true,
  };
};

export const playNewMusic = (path, name) => {
  return dispatch => {
    return co(function *() {
      NativeModules.MusicPlayer.playNewMusic(path);
      dispatch(dispatchPlayNewMusic(name));
    });
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
    return co(function *() {
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
    return co(function *() {
      NativeModules.MusicPlayer.playCurrentMusic();
      dispatch(dispatchPlayCurrentMusic());
    });
  }
};

