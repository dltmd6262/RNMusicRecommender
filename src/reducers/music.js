import {
  SHOW_MUSIC_PLAYER,
  PAUSE_CURRENT_MUSIC,
  PLAY_CURRENT_MUSIC,
  PLAY_NEW_MUSIC,
  CHANGE_SHUFFLE,
  CHANGE_REPEAT,
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
        currentMusicDuration: action.currentMusicDuration,
        currentMusicTitle: action.currentMusicTitle,
        currentMusicArtist: action.currentMusicArtist,
        currentMusicAlbum: action.currentMusicAlbum,
      };
    case CHANGE_SHUFFLE:
      return {
        ...state,
        shuffle: action.shuffle,
      };
    case CHANGE_REPEAT:
      return {
        ...state,
        repeat: action.repeat,
      };
    default:
      return state;
  }
};

export default music;
