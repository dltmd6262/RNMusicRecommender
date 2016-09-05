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
      dispatch(showMusicPlayer(show));
    },
    playCurrentMusic: () => {
      dispatch(playCurrentMusic());
    },
    pauseCurrentMusic: () => {
      dispatch(pauseCurrentMusic());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionButton);
