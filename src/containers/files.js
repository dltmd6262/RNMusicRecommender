'use strict';

import React from 'react';
import {connect} from 'react-redux';
import FileList from '../components/files/fileList';
import {updateCurrentPlaylist} from '../actions/files';
import {playNewMusic, showMusicPlayer} from '../actions/music';

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    playlist: state.Files.playlist,
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
    updateCurrentPlaylist: (list) => {
      dispatch(updateCurrentPlaylist(list));
    },
  };
};

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(FileList);
