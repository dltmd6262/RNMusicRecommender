'use strict';

import {connect} from 'react-redux';
import Player from '../components/musicPlayer/player';
import {
  showMusicPlayer,
} from '../actions/music';


const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    currentMusic: state.Music.currentMusic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showMusicPlayer: (show) => {
      dispatch(showMusicPlayer(show));
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
