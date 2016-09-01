'use strict';

export const SHOW_MUSIC_PLAYER = 'SHOW_MUSIC_PLAYER';
export const showMusicPlayer = (show) => {
  return {
    type: SHOW_MUSIC_PLAYER,
    showMusicPlayer: show,
  }
};
