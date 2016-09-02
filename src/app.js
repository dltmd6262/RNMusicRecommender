'use strict';

import React from 'react';
import {UIManager, Platform} from 'react-native';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Reducer from './reducers/index';
import thunk from 'redux-thunk';

import {fetchNewsfeedData} from './actions/newsfeed';
import {updateFileStructure} from './actions/files';

import App from './containers/app';

let initialState = {
  Newsfeed: {
    newsfeedCardData: [],
    isRefreshing: false,
  },
  User: {
    uid: null,
  },
  Files: {
    files: [],
  },
  Music: {
    currentPosition: '0:00',
    isPlaying: false,
    currentMusic: '',
    isShowingPlayer: false,
  },
};

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

let store = createStore(Reducer, initialState, applyMiddleware(thunk));

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
};

// Initial db call for newsfeed data
store.dispatch(fetchNewsfeedData());
store.dispatch(updateFileStructure());

export default AppWithStore;
