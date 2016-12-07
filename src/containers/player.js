'use strict';

import {connect} from 'react-redux';
import Player from '../components/musicPlayer/player';
import {
  playNewMusic,
  playCurrentMusic,
  pauseCurrentMusic,
  showMusicPlayer,
  rewind,
  fastForward,
  changeRepeat,
  changeShuffle,
  changeMute,
  jumpTo,
} from '../actions/music';


const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    isPlaying: state.Music.isPlaying,
    currentMusic: state.Music.currentMusic,
    currentMusicDuration: state.Music.currentMusicDuration,
    currentMusicTitle: state.Music.currentMusicTitle,
    currentMusicArtist: state.Music.currentMusicArtist,
    currentMusicAlbum: state.Music.currentMusicAlbum,
    shuffle: state.Music.shuffle,
    repeat: state.Music.repeat,
    mute: state.Music.mute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playNewMusic: (path, name) => {
      dispatch(playNewMusic(path, name));
    },
    playCurrentMusic: () => {
      dispatch(playCurrentMusic());
    },
    pauseCurrentMusic: () => {
      dispatch(pauseCurrentMusic());
    },
    showMusicPlayer: (show) => {
      dispatch(showMusicPlayer(show));
    },
    rewind: (prev, currentMusic) => {
      dispatch(rewind(prev, currentMusic));
    },
    jumpTo: (milliSec) => {
      dispatch(jumpTo(milliSec));
    },
    fastForward: (currentMusic) => {
      dispatch(fastForward(currentMusic));
    },
    changeRepeat: (mode) => {
      dispatch(changeRepeat(mode));
    },
    changeShuffle: (shouldShuffle) => {
      dispatch(changeShuffle(shouldShuffle));
    },
    changeMute: (mute) => {
      dispatch(changeMute(mute));
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
