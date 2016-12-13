'use strict';

import App from '../components/app';
import {updateCurrentFolder} from '../actions/files';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    currentFolder: state.Files.currentFolder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentFolder: (folderName) => {
      dispatch(updateCurrentFolder(folderName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
