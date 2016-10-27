'use strict';

import _ from 'lodash';
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
      dispatch(dispatchPlayNewMusic(name, result.duration));
    });
  }
};

export const rewind = (prev, currentMusic) => {
  return (dispatch, getState) => {
    if (prev) {
      const state = getState();
      const playlist = state.Files.playlist, isRandom = state.Music.isRandom;
      const currentIndex = _.findIndex(playlist, m => m.fileName === currentMusic);
      const previousMusic = isRandom ? _.sample(playlist) :
        playlist[currentIndex === 0 ? playlist.length - 1 : currentIndex - 1];
      playNewMusic(previousMusic.path, previousMusic.fileName)(dispatch);
    } else {
      NativeModules.MusicPlayer.jumpTo(0);
    }
  };
};

export const fastForward = (currentMusic) => {
  return (dispatch, getState) => {
    const state = getState();
    const playlist = state.Files.playlist, isRandom = state.Music.isRandom;
    const currentIndex = _.findIndex(playlist, m => m.fileName === currentMusic);
    const nextMusic = isRandom ? _.sample(playlist) :
      playlist[currentIndex === (playlist.length - 1) ? 0 : currentIndex + 1];
    playNewMusic(nextMusic.path, nextMusic.fileName)(dispatch);
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
