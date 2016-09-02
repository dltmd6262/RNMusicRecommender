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
  StyleSheet,
} = ReactNative;

const {width: fullWidth, height: fullHeight} = Dimensions.get('window');
const closeIcon = require('../../asset/close.png');
const bgImg = require('../../asset/test.jpg');
const repeatIcon = require('../../asset/repeat.png');
const shuffleIcon = require('../../asset/shuffle.png');
const backIcon = require('../../asset/back.png');
const forwardIcon = require('../../asset/forward.png');

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topBgLeft: new Animated.Value(Dimensions.get('window').width),
      controlBgY: new Animated.Value(150),
      controlBgYLower: new Animated.Value(0),
    };

    BackAndroid.addEventListener('hidePlayer', () => {
      if (props.isShowingPlayer) {
        props.showMusicPlayer(false);
      }
      return true;
    });

  }

  startAnimation(topBgLeft, controlBgY, controlBgYLower) {
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
  }

  render() {
    const enableTouch = this.props.isShowingPlayer ? 'auto' : 'none';
    const topBgLeft = this.props.isShowingPlayer ? 0 : fullWidth;
    const controlBgY = this.props.isShowingPlayer ? 150 : -50;
    const controlBgYLower = this.props.isShowingPlayer ? 0 : -200;

    this.startAnimation(topBgLeft, controlBgY, controlBgYLower);

    return (
      <View style={{width: fullWidth, height: fullHeight}} pointerEvents={enableTouch}>
        <Image style={s.bgImage} source={bgImg}/>
        <Text style={s.title}>{this.props.currentMusic}</Text>
        <Animated.View style={[s.upperTriangle, {left: this.state.topBgLeft}]}>
          <TouchableOpacity style={s.closeButton} onPress={this.props.showMusicPlayer.bind(this, false)}>
            <Image source={closeIcon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[s.lowerTriangle, {bottom: this.state.controlBgY}]}>
          <Image style={s.repeat} source={repeatIcon}/>
          <Image style={s.shuffle} source={shuffleIcon}/>
        </Animated.View>
        <Animated.View style={[s.lowerRectangle, {bottom: this.state.controlBgYLower}]}>
          <Image style={s.backButton} source={backIcon}/>
          <Image style={s.forwardButton} source={forwardIcon}/>
          <View style={s.progressBg} />
          <View style={s.progressFill} />
          <Text style={s.timeLeft}>{this.props.currentMusicDuration}</Text>
          <Text style={s.timeLeft}>{'0:00'}</Text>
        </Animated.View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  upperTriangle: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: 'transparent',
    borderRightWidth: fullWidth,
    borderRightColor: '#faf2e8',
    borderStyle: 'solid'
  },
  lowerTriangle: {
    position: 'absolute',
    width: fullWidth,
    left: 0,
    borderTopWidth: 100,
    borderTopColor: 'transparent',
    borderRightWidth: fullWidth,
    borderRightColor: '#faf2e8',
    borderStyle: 'solid'
  },
  lowerRectangle: {
    backgroundColor: '#faf2e8',
    position: 'absolute',
    width: fullWidth,
    height: 150,
    left: 0,
  },
  title: {
    position: 'absolute',
    top: 70,
    left: 10,
    width: 250,
    color: '#ffffff',
    fontSize: 25
  },
  closeButton: {
    left: fullWidth - 50,
    top: 10,
    height: 40,
    width: 40,
  },
  bgImage: {
    alignSelf: 'center',
  },
  repeat: {
    position: 'absolute',
    bottom: 15,
    left: fullWidth - 60,
    tintColor: '#ee9459',
    transform: [{scale: 0.6}],
  },
  shuffle: {
    position: 'absolute',
    bottom: 15,
    left: fullWidth - 110,
    tintColor: '#ee9459',
    transform: [{scale: 0.6}],
  },
  backButton: {
    position: 'absolute',
    bottom: 100,
    left: 80,
    tintColor: '#ee9459',
  },
  forwardButton: {
    position: 'absolute',
    bottom: 100,
    left: fullWidth - 80 - 48,
    tintColor: '#ee9459',
  },
  progressBg: {
    position: 'absolute',
    height: 3,
    width: 230,
    bottom: 65,
    left: 70,
    backgroundColor: '#e9e6c9',
  },
  progressFill: {
    position: 'absolute',
    height: 3,
    width: 110,
    bottom: 65,
    left: 70,
    backgroundColor: '#ca6144',
  },
  timeLeft: {
    position: 'absolute',
    bottom: 57,
    left: fullWidth - 50,
    color: '#ee9459',
    fontSize: 15,
  },
  timePassed: {
    position: 'absolute',
    bottom: 57,
    left: 25,
    color: '#ee9459',
    fontSize: 15,
  },
});
