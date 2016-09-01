'use strict';

import {connect} from 'react-redux';
import {showMusicPlayer} from '../actions/music';
import ActionButton from '../components/musicPlayer/actionButton';

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
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
)(ActionButton);
