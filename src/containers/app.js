'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';

import Files from './files';
import ActionButton from './actionButton';
import Player from './player';

const {
  View,
  Text,
  Dimensions,
  NativeModules,
} = ReactNative;

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      NativeModules.FileSystem.stopSplashScreen();
    }, 0);
  }

  render() {
    const {width: fullWidth, height: fullHeight} = Dimensions.get('window');

    return (
      <View style={{height: fullHeight, width: fullWidth}}>
        <View style={{width: fullWidth, height: 80, elevation: 2, backgroundColor: '#ffffff'}}>
          <Text style={{alignSelf: 'center', marginTop: 40, fontSize: 22, color: '#7b7b7b', fontFamily: 'roboto'}}>Liston</Text>
        </View>
        <View style={{width: fullWidth, height: fullHeight - 80 - 100}}>
          <Files/>
        </View>
        <Player/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
