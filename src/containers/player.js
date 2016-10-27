'use strict';

import {connect} from 'react-redux';
import Player from '../components/musicPlayer/player';
import {
  playNewMusic,
  showMusicPlayer,
  rewind,
  fastForward,
} from '../actions/music';


const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    currentMusic: state.Music.currentMusic,
    currentMusicDuration: state.Music.currentMusicDuration,
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
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
