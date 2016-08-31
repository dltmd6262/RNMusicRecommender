'use strict';

import React from 'react';
import {connect} from 'react-redux';
import FileList from '../components/files/fileList';

const mapStateToProps = (state) => {
  return {
    files: state.Files.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(FileList);
