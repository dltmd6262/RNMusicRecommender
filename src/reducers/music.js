import {
  SHOW_MUSIC_PLAYER,
  PAUSE_CURRENT_MUSIC,
  PLAY_CURRENT_MUSIC,
  PLAY_NEW_MUSIC
} from '../actions/music';

const music = (state = {}, action) => {
  switch (action.type) {
    case SHOW_MUSIC_PLAYER:
      return {
        ...state,
        isShowingPlayer: action.showMusicPlayer,
      };
    case PAUSE_CURRENT_MUSIC:
    case PLAY_CURRENT_MUSIC:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case PLAY_NEW_MUSIC:
      return {
        ...state,
        isPlaying: action.isPlaying,
        currentMusic: action.currentMusic,
      };
    default:
      return state;
  }
};

export default music;
