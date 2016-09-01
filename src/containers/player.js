'use strict';

import {connect} from 'react-redux';
import {showMusicPLayer} from '../actions/music';
import Player from '../components/musicPlayer/player';

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showMusicPlayer: (show) => {
      dispatch(showMusicPLayer(show));
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
