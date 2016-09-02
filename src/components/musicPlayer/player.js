'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
  BackAndroid,
  Easing,
  Animated,
  View,
  Text,
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
        duration: 300,
        toValue: topBgLeft,
        easing: Easing.out(Easing.cubic),
      }
    ).start();

    Animated.timing(
      this.state.controlBgY, {
        duration: 300,
        toValue: controlBgY,
        easing: Easing.out(Easing.cubic),
      }
    ).start();

    Animated.timing(
      this.state.controlBgYLower, {
        duration: 300,
        toValue: controlBgYLower,
        easing: Easing.out(Easing.cubic),
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
        <Image style={{alignSelf: 'center'}} source={require('../../asset/test.jpg')}/>
        <Text style={{position: 'absolute', top: 70, left: 10, width: 250, color: '#ffffff', fontSize: 30}}>{this.props.currentMusic}</Text>
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
        }}>
          <Image style={{position: 'absolute', bottom: 100, left: 80, tintColor: '#ee9459'}} source={require('../../asset/back.png')}/>
          <Image style={{position: 'absolute', bottom: 100, left: fullWidth - 80 - 48, tintColor: '#ee9459'}} source={require('../../asset/forward.png')}/>
          <View style={{position: 'absolute', height: 3, width: 220, bottom: 65, left: 70, backgroundColor: '#e9e6c9'}} />
          <View style={{position: 'absolute', height: 3, width: 100, bottom: 65, left: 70, backgroundColor: '#ca6144'}} />
          <Text style={{position: 'absolute', bottom: 57, left: fullWidth - 50, color: '#ee9459', fontSize: 15}}>{this.props.currentMusicDuration}</Text>
          <Text style={{position: 'absolute', bottom: 57, left: 25, color: '#ee9459', fontSize: 15}}>{'0:00'}</Text>
        </Animated.View>
      </View>
    )
  }
}
