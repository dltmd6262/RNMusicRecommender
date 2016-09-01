'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
  BackAndroid,
  Easing,
  Animated,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} = ReactNative;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topBgLeft: new Animated.Value(Dimensions.get('window').width),
      controlBgY: new Animated.Value(150),
      controlBgYLower: new Animated.Value(0),
    }
  }

  render() {
    const {width: fullWidth, height: fullHeight} = Dimensions.get('window');

    const enableTouch = this.props.isShowingPlayer ? 'auto' : 'none';
    const topBgLeft = this.props.isShowingPlayer ? 0 : fullWidth;
    const controlBgY = this.props.isShowingPlayer ? 150 : -50;
    const controlBgYLower = this.props.isShowingPlayer ? 0 : -200;

    Animated.timing(
      this.state.topBgLeft, {
        delay: 100,
        duration: 200,
        toValue: topBgLeft,
        easing: Easing.cubic,
      }
    ).start();

    Animated.timing(
      this.state.controlBgY, {
        duration: 200,
        toValue: controlBgY,
        easing: Easing.cubic,
      }
    ).start();

    Animated.timing(
      this.state.controlBgYLower, {
        duration: 200,
        toValue: controlBgYLower,
        easing: Easing.cubic,
      }
    ).start();

    if (this.props.isShowingPlayer) {
      BackAndroid.addEventListener('hidePlayer', () => {
        this.props.showMusicPlayer(false);
        return true
      });
    } else {
      BackAndroid.removeEventListener('hidePlayer');
    }

    return (
      <View style={{width: fullWidth, height: fullHeight}} pointerEvents={enableTouch}>
        <Image style={{alignSelf: 'center'}} source={require('../../asset/test.jpg')} />
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          width: 0,
          height: 0,
          left: this.state.topBgLeft,
          borderBottomWidth: 100,
          borderBottomColor: 'transparent',
          borderRightWidth: fullWidth,
          borderRightColor: '#e9e6c9',
          borderStyle: 'solid'
        }}>
          <TouchableOpacity style={{left: fullWidth - 50, top: 10, height: 40, width: 40}} onPress={this.props.showMusicPlayer.bind(this, false)}>
            <Image source={require('../../asset/close.png')} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          width: fullWidth,
          left: 0,
          bottom: this.state.controlBgY,
          borderTopWidth: 100,
          borderTopColor: 'transparent',
          borderRightWidth: fullWidth,
          borderRightColor: '#faf2e8',
          borderStyle: 'solid'
        }}/>
        <Animated.View style={{
          backgroundColor: '#faf2e8',
          position: 'absolute',
          width: fullWidth,
          height: 150,
          left: 0,
          bottom: this.state.controlBgYLower,
        }}/>
      </View>
    )
  }
}
