"use strict";

import React from "react";
import { UIManager, Platform, BackHandler } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Reducer from "./reducers/index";
import thunk from "redux-thunk";
import c from "./constants";

import { updateFileStructure } from "./actions/files";

import App from "./containers/app";

let initialState = {
  Files: {
    files: [],
    playlist: []
  },
  Music: {
    currentPosition: "0:00",
    isPlaying: false,
    currentMusic: "",
    isShowingPlayer: false,
    shuffle: false,
    repeat: c.RepeatModes.None
  }
};

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

let store = createStore(Reducer, initialState, applyMiddleware(thunk));

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

BackHandler.addEventListener("preventDefault", () => {
  return true;
});

// Initial db call for newsfeed data
store.dispatch(updateFileStructure());

export default AppWithStore;
