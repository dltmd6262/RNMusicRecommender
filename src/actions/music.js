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

const dispatchPlayNewMusic = (name, duration, title, artist, album) => {
  return {
    type: PLAY_NEW_MUSIC,
    currentMusicDuration: duration,
    currentMusic: name,
    currentMusicTitle: title,
    currentMusicArtist: artist,
    currentMusicAlbum: album,
    isPlaying: true,
  };
};

export const playNewMusic = (path, name) => {
  return dispatch => {
    return runSafe(function *() {
      const result = yield NativeModules.MusicPlayer.playNewMusic(path);
      dispatch(dispatchPlayNewMusic(name, result.duration, result.title, result.artist, result.album));
    });
  }
};

export const rewind = (prev, currentMusic) => {
  return (dispatch, getState) => {
    if (prev) {
      const state = getState();
      const playlist = state.Files.playlist, isShuffle = state.Music.shuffle;
      const currentIndex = _.findIndex(playlist, m => m.fileName === currentMusic);
      const previousMusic = isShuffle ? _.sample(playlist) :
        playlist[currentIndex === 0 ? playlist.length - 1 : currentIndex - 1];
      playNewMusic(previousMusic.path, previousMusic.fileName)(dispatch);
    } else {
      NativeModules.MusicPlayer.jumpTo(0);
    }
  };
};

export const JUMP_TO = 'JUMP_TO';

export const jumpTo = (milliSec) => {
  NativeModules.MusicPlayer.jumpTo(milliSec);
  return {
    type: JUMP_TO,
  };
};

export const fastForward = (currentMusic) => {
  return (dispatch, getState) => {
    const state = getState();
    const playlist = state.Files.playlist, isShuffle = state.Music.shuffle;
    const currentIndex = _.findIndex(playlist, m => m.fileName === currentMusic);
    const nextMusic = isShuffle ? _.sample(playlist) :
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

export const CHANGE_SHUFFLE = 'CHANGE_SHUFFLE';

export const changeShuffle = (shouldShuffle) => {
  return {
    type: CHANGE_SHUFFLE,
    shuffle: shouldShuffle,
  };
};

export const CHANGE_REPEAT = 'CHANGE_REPEAT';

export const changeRepeat = (mode) => {
  return {
    type: CHANGE_REPEAT,
    repeat: mode,
  };
};

export const CHANGE_MUTE = 'CHANGE_MUTE';

export const changeMute = (mute) => {
  NativeModules.MusicPlayer.changeMute(mute);
  return {
    type: CHANGE_MUTE,
    mute: mute,
  };
};
