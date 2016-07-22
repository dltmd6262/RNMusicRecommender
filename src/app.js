'use strict';

import React from 'react';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Reducer from './reducers/index';
import thunk from 'redux-thunk';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {fetchNewsfeedData} from './actions/newsfeed';
import Newsfeed from './containers/newsfeed';
import Login from './containers/login';

let initialState = {
  Newsfeed: {
    newsfeedCardData: [],
    isRefreshing: false,
  },
  User: {
    uid: null,
  },
};

let store = createStore(Reducer, initialState, applyMiddleware(thunk));

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <ScrollableTabView
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
