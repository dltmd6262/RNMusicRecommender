'use strict';

import {connect} from 'react-redux';
import Player from '../components/musicPlayer/player';
import {
  showMusicPlayer,
  playFromBeginning,
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
    showMusicPlayer: (show) => {
      dispatch(showMusicPlayer(show));
    },
    playFromBeginning: () => {
      dispatch(playFromBeginning());
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
