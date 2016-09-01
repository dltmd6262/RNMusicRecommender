import {SHOW_MUSIC_PLAYER} from '../actions/music';

const music = (state = {}, action) => {
  switch (action.type) {
    case SHOW_MUSIC_PLAYER:
      return {
        ...state,
        isShowingPlayer: action.showMusicPlayer,
      };
    default:
      return state;
  }
};

export default music;
