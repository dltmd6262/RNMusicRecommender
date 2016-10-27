'use strict';

import {connect} from 'react-redux';
import Player from '../components/musicPlayer/player';
import {
  playNewMusic,
  showMusicPlayer,
  rewind,
  fastForward,
  changeRepeat,
  changeShuffle,
} from '../actions/music';


const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    currentMusic: state.Music.currentMusic,
    currentMusicDuration: state.Music.currentMusicDuration,
    shuffle: state.Music.shuffle,
    repeat: state.Music.repeat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playNewMusic: (path, name) => {
      dispatch(playNewMusic(path, name));
    },
    showMusicPlayer: (show) => {
      dispatch(showMusicPlayer(show));
    },
    rewind: (prev, currentMusic) => {
      dispatch(rewind(prev, currentMusic));
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
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
