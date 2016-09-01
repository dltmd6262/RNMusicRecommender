'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Newsfeed from './newsfeed';
import Login from './login';
import Files from './files';
import ActionButton from './actionButton';
import Player from './player';

const {
  View,
  Animated,
  Easing,
  Dimensions
} = ReactNative;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerBgOpacity: new Animated.Value(0),
      btnAnimX: new Animated.Value(50),
      btnAnimY: new Animated.Value(50),
    }
  }

  render() {
    const {width: fullWidth, height: fullHeight} = Dimensions.get('window');

    const playerBgOpacity = this.props.isShowingPlayer ? 1 : 0;
    const actionBtnRight = this.props.isShowingPlayer ? fullWidth / 2 - 30 : 30;
    const actionBtnBottom = this.props.isShowingPlayer ? 95 : 30;

    Animated.timing(
      this.state.playerBgOpacity, {
        duration: 300,
        toValue: playerBgOpacity,
        easing: Easing.out(Easing.cubic),
      }
    ).start();

    Animated.timing(
      this.state.btnAnimX, {
        delay: 100,
        duration: 300,
        toValue: actionBtnRight,
        easing: Easing.out(Easing.cubic),
      }
    ).start();

    Animated.timing(
      this.state.btnAnimY, {
        delay: 100,
        duration: 300,
        toValue: actionBtnBottom,
        easing: Easing.out(Easing.cubic),
      }
    ).start();

    return (
      <View style={{height: fullHeight, width: fullWidth}}>
        <ScrollableTabView
          style={{backgroundColor: '#faf2e8'}}
          tabBarUnderlineColor='#ca6144'
          tabBarBackgroundColor='#e9e6c9'
          tabBarActiveTextColor='#ca6144'
          tabBarInactiveTextColor='#e0b58c'>
          <Files tabLabel="Music"/>
          <Newsfeed tabLabel="Newsfeed"/>
          <Login tabLabel="Profile"/>
        </ScrollableTabView>
        <Animated.View style={{position: 'absolute', right: this.state.btnAnimX, bottom: this.state.btnAnimY, zIndex: 10, height: 60, width: 60}} pointerEvents={"box-none"}>
          <ActionButton/>
        </Animated.View>
        <Animated.View style={{opacity: this.state.playerBgOpacity, backgroundColor: 'rgba(0, 0, 0, 0.8)', position: 'absolute', left: 0, bottom: 0, zIndex: 5}} pointerEvents={"box-none"}>
          <Player />
        </Animated.View>
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
