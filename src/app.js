'use strict';

import React from 'react';
import { UIManager, Platform } from 'react-native';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Reducer from './reducers/index';
import thunk from 'redux-thunk';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {fetchNewsfeedData} from './actions/newsfeed';
import Newsfeed from './containers/newsfeed';
import Login from './containers/login';
import {NativeModules} from 'react-native';

// TODO
// NativeModules.FileSystem.getFoldersWithMusic().then(f => {
//   f = f.filter(folder => {
//     return folder.files.length > 0;
//   });
//
//   console.log(2121, f);
//
//   NativeModules.MusicPlayer.playNewMusic(f[0].files[1].path);
//
//   console.log(f[0].files[1]);
// });

let initialState = {
  Newsfeed: {
    newsfeedCardData: [],
    isRefreshing: false,
  },
  User: {
    uid: null,
  },
};

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

let store = createStore(Reducer, initialState, applyMiddleware(thunk));

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <ScrollableTabView
        style={{backgroundColor: '#faf2e8'}}
        tabBarUnderlineColor='#ca6144'
        tabBarBackgroundColor='#e9e6c9'
        tabBarActiveTextColor='#ca6144'
        tabBarInactiveTextColor='#e0b58c'>
        <Newsfeed tabLabel='Newsfeed'/>
        <Login tabLabel='Profile'/>
      </ScrollableTabView>
    </Provider>
  )
};

// Initial db call for newsfeed data
store.dispatch(fetchNewsfeedData());

export default AppWithStore;
