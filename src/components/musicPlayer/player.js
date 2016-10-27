'use strict';

import React, {Component} from 'react';
import {milliToTimeString, getNextRepeatMode} from '../../util';
import ReactNative, {DeviceEventEmitter} from 'react-native';
import c from '../../constants';

const {
  BackAndroid,
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
const repeatOneIcon = require('../../asset/repeat_one.png');
const repeatAllIcon = require('../../asset/repeat_all.png');
const shuffleIcon = require('../../asset/shuffle.png');
const backIcon = require('../../asset/back.png');
const forwardIcon = require('../../asset/forward.png');

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressBarWidth: 0,
      currentProgress: milliToTimeString(0),
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hidePlayer', () => {
      if (this.props.isShowingPlayer) {
        this.props.showMusicPlayer(false);
      }
      return false;
    });

    DeviceEventEmitter.addListener('MusicProgress', (progress) => {
      this.setState({
        currentProgress: progress.currentPosition,
        progressBarWidth: progress.currentPosition / this.props.currentMusicDuration * (fullWidth * 0.85),
      });
    });

    DeviceEventEmitter.addListener('MusicCompleted', () => {
      this.props.repeat === c.RepeatModes.One ?
        this.props.rewind(false, this.props.currentMusic) : this.fastForward();
    });
  }

  rewind() {
    const shouldPlayPrevious = this.state.currentProgress < 2000;
    this.props.rewind(shouldPlayPrevious, this.props.currentMusic);
  }

  fastForward() {
    this.props.fastForward(this.props.currentMusic);
  }

  changeShuffle() {
    this.props.changeShuffle(!this.props.shuffle);
  }

  changeRepeat() {
    this.props.changeRepeat(getNextRepeatMode(this.props.repeat));
  }

  render() {
    const enableTouch = this.props.isShowingPlayer ? 'auto' : 'none';

    const shuffleOpacity = this.props.shuffle ? 1 : 0.7;
    const repeatOpacity = this.props.repeat === c.RepeatModes.None ? 0.7 : 1;
    const repeatImage = this.props.repeat === c.RepeatModes.One ? repeatOneIcon : repeatAllIcon;

    return (
      <View style={{width: fullWidth, height: fullHeight, backgroundColor: '#ffffff'}} pointerEvents={enableTouch}>

        <Text style={s.title}>{this.props.currentMusic}</Text>

        <Image style={{
          width: fullWidth * 0.75,
          height: fullWidth * 0.75,
          borderRadius: fullWidth * 0.75 / 2,
          alignSelf: 'center',
        }} source={bgImg}></Image>

        <TouchableOpacity activeOpacity={1} style={{width: 50, height: 50}} onPress={this.changeRepeat.bind(this)}>
          <Image style={{opacity: repeatOpacity, tintColor: '#606060', transform: [{scale: 0.6}]}} source={repeatImage}/>
        </TouchableOpacity>

        <TouchableOpacity style={s.backButton} onPress={this.rewind.bind(this)}>
          <Image style={{tintColor: '#606060', transform: [{scale: 0.8}]}} source={backIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={s.forwardButton} onPress={this.fastForward.bind(this)}>
          <Image style={{tintColor: '#606060', transform: [{scale: 0.8}]}} source={forwardIcon}/>
        </TouchableOpacity>
        <View style={s.progressBg} />
        <View style={[s.progressFill, {width: this.state.progressBarWidth}]} />
        <Text style={s.timeLeft}>{milliToTimeString(this.props.currentMusicDuration)}</Text>
        <Text style={s.timePassed}>{milliToTimeString(this.state.currentProgress)}</Text>
      </View>
    )
  }
}

const s = StyleSheet.create({
  title: {
    position: 'absolute',
    left: 80,
    top: 1100,
    width: 250,
    color: '#606060',
    fontSize: 25
  },
  closeButton: {
    left: fullWidth - 50,
    top: 10,
    height: 40,
    width: 40,
  },
  repeat: {
    position: 'absolute',
    bottom: 15,
    left: fullWidth - 60,
    backgroundColor: '#000000',
  },
  shuffle: {
    position: 'absolute',
    bottom: 15,
    left: fullWidth - 110,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    bottom: 100,
    left: 80,
  },
  forwardButton: {
    position: 'absolute',
    bottom: 100,
    left: fullWidth - 80 - 48,
  },
  progressBg: {
    position: 'absolute',
    height: 2,
    width: fullWidth * 0.85,
    top: fullHeight * 0.78,
    left: fullWidth * (1 - 0.85) / 2,
    backgroundColor: '#a2a2a2',
  },
  progressFill: {
    position: 'absolute',
    height: 2,
    top: fullHeight * 0.78,
    left: fullWidth * (1 - 0.85) / 2,
    backgroundColor: '#606060',
  },
  timeLeft: {
    position: 'absolute',
    bottom: 57,
    left: fullWidth - 50,
    color: '#606060',
    fontSize: 15,
  },
  timePassed: {
    position: 'absolute',
    bottom: 57,
    left: 25,
    color: '#606060',
    fontSize: 15,
  },
});
