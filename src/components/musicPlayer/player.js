'use strict';

import React, {Component} from 'react';
import {milliToTimeString, getNextRepeatMode} from '../../util';
import ReactNative, {DeviceEventEmitter} from 'react-native';
import Svg from 'react-native-svg-uri';
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
const bgImg = require('../../asset/test.jpg');
const repeatOneIcon = require('../../asset/repeat_one.svg');
const repeatAllIcon = require('../../asset/repeat_all.svg');

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

        <Image style={s.cover} source={bgImg}></Image>

        <TouchableOpacity activeOpacity={1} style={s.repeat} onPress={this.changeRepeat.bind(this)}>
          <Svg style={{opacity: repeatOpacity}} width="17" height="17" source={repeatImage} />
        </TouchableOpacity>

        <TouchableOpacity style={s.backButton} onPress={this.rewind.bind(this)}>
          <Svg width="37" height="37" source={require('../../asset/back.svg')} />
        </TouchableOpacity>
        <TouchableOpacity style={s.forwardButton} onPress={this.fastForward.bind(this)}>
          <Svg width="37" height="37" source={require('../../asset/forward.svg')} />
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
  cover: {
    marginTop: fullHeight * 0.12,
    width: fullWidth * 0.75,
    height: fullWidth * 0.75,
    borderRadius: fullWidth * 0.75 / 2,
    alignSelf: 'center',
  },
  title: {
    position: 'absolute',
    left: fullWidth * 0.075,
    top: fullHeight * 0.61,
    width: 250,
    color: '#606060',
    fontSize: 16
  },
  closeButton: {
    left: fullWidth - 50,
    top: 10,
    height: 40,
    width: 40,
  },
  repeat: {
    position: 'absolute',
    bottom: fullHeight * 0.12,
    left: fullWidth * 0.07,
  },
  shuffle: {
    position: 'absolute',
    bottom: 15,
    left: fullWidth - 110,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    bottom: fullHeight * 0.11,
    left: 80,
  },
  forwardButton: {
    position: 'absolute',
    bottom: fullHeight * 0.11,
    right: 80,
  },
  progressBg: {
    position: 'absolute',
    height: 1,
    width: fullWidth * 0.85,
    top: fullHeight * 0.75,
    left: fullWidth * (1 - 0.85) / 2,
    backgroundColor: '#d9d9d9',
  },
  progressFill: {
    position: 'absolute',
    height: 1,
    top: fullHeight * 0.75,
    left: fullWidth * (1 - 0.85) / 2,
    backgroundColor: '#606060',
  },
  timeLeft: {
    position: 'absolute',
    top: fullHeight * 0.765,
    right: 30,
    color: '#606060',
    fontSize: 11,
  },
  timePassed: {
    position: 'absolute',
    top: fullHeight * 0.765,
    left: 30,
    color: '#606060',
    fontSize: 11,
  },
});
