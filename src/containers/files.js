'use strict';

import React from 'react';
import {connect} from 'react-redux';
import FileList from '../components/files/fileList';
import {playNewMusic, showMusicPlayer} from '../actions/music';

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    files: state.Files.files,
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
  };
};

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(FileList);
