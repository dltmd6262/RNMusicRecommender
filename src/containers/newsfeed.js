'use strict';

import React from 'react';
import { connect } from 'react-redux'
import {fetchNewsfeedData, updateAddResult, addNewMusic } from '../actions/newsfeed';

import NewsfeedView from '../components/newsfeed/newsfeed';

const mapStateToProps = (state) => {
  return {
    newsfeedCardData: state.Newsfeed.newsfeedCardData,
    addNewsfeedResult: state.Newsfeed.addNewsfeedResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsfeedData: () => {dispatch(fetchNewsfeedData())},
    addNewMusic: (data) => {dispatch(addNewMusic(data))},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsfeedView);
