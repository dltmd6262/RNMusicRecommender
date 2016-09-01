'use strict';

import {connect} from 'react-redux';
import ActionButton from '../components/musicPlayer/actionButton';
import {showMusicPlayer,
  playCurrentMusic,
  pauseCurrentMusic,
} from '../actions/music';

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    isPlaying: state.Music.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showMusicPlayer: (show) => {
      console.log(2020);
      dispatch(showMusicPlayer(show));
    },
    playCurrentMusic: () => {
      console.log(2424);
      dispatch(playCurrentMusic());
    },
    pauseCurrentMusic: () => {
      console.log(2828);
      dispatch(pauseCurrentMusic());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionButton);
