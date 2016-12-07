'use strict';

import React, {Component} from 'react';
import {milliToTimeString, getNextRepeatMode} from '../../util';
import ReactNative, {DeviceEventEmitter} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
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
      if (!this.dragging) {
        this.setState({
          currentProgress: progress.currentPosition,
          progressBarWidth: progress.currentPosition / this.props.currentMusicDuration * (fullWidth * 0.85),
        });
      }
    });

    DeviceEventEmitter.addListener('MusicCompleted', () => {
      this.props.repeat === c.RepeatModes.One ?
        this.props.rewind(false, this.props.currentMusic) : this.fastForward();
    });
  }

  rewind() {
    if (this.props.currentMusic) {
      const shouldPlayPrevious = this.state.currentProgress < 2000;
      this.props.rewind(shouldPlayPrevious, this.props.currentMusic);
    }
  }

  fastForward() {
    if (this.props.currentMusic) {
      this.props.fastForward(this.props.currentMusic);
    }
  }

  changeShuffle() {
    this.props.changeShuffle(!this.props.shuffle);
  }

  changeRepeat() {
    this.props.changeRepeat(getNextRepeatMode(this.props.repeat));
  }

  changeMute() {
    this.props.changeMute(!this.props.mute);
  }

  onProgressChange(e) {
    this.dragging = true;
    this.setState({
      progressBarWidth: e.nativeEvent.pageX - fullWidth * 0.15 / 2,
    });
  }

  onProgressChangeEnd(e) {
    if (this.props.currentMusicDuration) {
      this.props.jumpTo(parseInt((e.nativeEvent.pageX - (fullWidth * 0.15 / 2)) / (fullWidth * 0.85) * this.props.currentMusicDuration, 10));
    }
    this.dragging = false;
  }

  render() {
    const s = this.props.isShowingPlayer ? full : mini;
    const playButtonCb = this.props.isPlaying ? this.props.pauseCurrentMusic : this.props.playCurrentMusic;
    const repeatOpacity = this.props.repeat === c.RepeatModes.None ? 0.7 : 1;
    const repeatImage = this.props.repeat === c.RepeatModes.One ? 'repeat-one' : 'repeat';

    return (
      <TouchableOpacity activeOpacity={1} style={s.container} onPress={this.props.isShowingPlayer ? () => {} : this.props.showMusicPlayer.bind(this, true)}>
        <View style={s.container}>

          <Text style={s.title} numberOfLines={1}>{this.props.currentMusicTitle}</Text>
          <Text style={s.artist} numberOfLines={1}>{this.props.currentMusicArtist}</Text>

          <View style={[s.cover, {
            marginTop: this.props.isShowingPlayer ? fullHeight * 0.12 : miniPlayerHeight * 0.35 / 4,
            marginLeft: 15,
            backgroundColor: 'transparent'
          }]} elevation={50}>
            {
              this.props.currentMusicAlbum ? <Image style={s.cover} source={{uri: 'file://' + this.props.currentMusicAlbum}} />
                : <Image style={s.cover} source={bgImg}/>
            }
          </View>

          {
            this.props.isShowingPlayer ?
              <TouchableOpacity activeOpacity={1} style={s.repeat} onPress={this.changeRepeat.bind(this)}>
                <MaterialIcon style={{opacity: repeatOpacity}} name={repeatImage} size={17} color="#606060" />
              </TouchableOpacity> : null
          }

          <TouchableOpacity activeOpacity={1} style={s.backButton} onPress={this.rewind.bind(this)}>
            <MaterialIcon name="skip-previous" size={this.props.isShowingPlayer ? 37 : 32} color="#606060" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} style={s.playButton} onPress={playButtonCb}>
            <MaterialIcon name={this.props.isPlaying ? "pause" : "play-arrow"} size={this.props.isShowingPlayer ? 37 : 32} color="#606060" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} style={s.forwardButton} onPress={this.fastForward.bind(this)}>
            <MaterialIcon name="skip-next" size={this.props.isShowingPlayer ? 37 : 32} color="#606060" />
          </TouchableOpacity>

          {
            this.props.isShowingPlayer ?
              <TouchableOpacity activeOpacity={1} style={s.mute} onPress={this.changeMute.bind(this)}>
                <MaterialIcon name={this.props.mute ? 'volume-mute' : 'volume-up'} size={17} color="#606060" />
              </TouchableOpacity> : null
          }

          {
            this.props.isShowingPlayer ?
              <View
                style={s.progressBg}
                hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}
                pointerEvents={'auto'}
                onStartShouldSetResponder={() => true}
                onResponderGrant={this.onProgressChange.bind(this)}
                onResponderMove={this.onProgressChange.bind(this)}
                onResponderRelease={this.onProgressChangeEnd.bind(this)}
              /> : null
          }

          {
            this.props.isShowingPlayer ?
              <View style={[s.progressFill, {width: this.state.progressBarWidth}]} /> : null
          }

          {
            this.props.isShowingPlayer ?
              <Text style={s.timeLeft}>{milliToTimeString(this.props.currentMusicDuration)}</Text> : null
          }

          {
            this.props.isShowingPlayer ?
              <Text style={s.timePassed}>{milliToTimeString(this.state.currentProgress)}</Text> : null
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const miniPlayerHeight = 100;

const mini = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: fullWidth,
    height: miniPlayerHeight,
    backgroundColor: '#ffffff',
    elevation: 10,
  },
  cover: {
    width: miniPlayerHeight * 0.65,
    height: miniPlayerHeight * 0.65,
    borderRadius: miniPlayerHeight * 0.65 / 2,
  },
  title: {
    fontFamily: 'roboto',
    position: 'absolute',
    left: fullWidth * 0.25,
    top: miniPlayerHeight * 0.18,
    width: 130,
    color: '#606060',
    fontSize: 16,
  },
  artist: {
    fontFamily: 'roboto_light',
    position: 'absolute',
    left: fullWidth * 0.25,
    top: miniPlayerHeight * 0.40,
    width: 130,
    color: '#606060',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    bottom: miniPlayerHeight * 0.5 - 30 / 4,
    right: 120,
  },
  playButton: {
    position: 'absolute',
    bottom: miniPlayerHeight * 0.5 - 30 / 4,
    right: 70,
  },
  forwardButton: {
    position: 'absolute',
    bottom: miniPlayerHeight * 0.5 - 30 / 4,
    right: 20,
  },
});

const full = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: fullWidth,
    height: fullHeight,
    backgroundColor: '#ffffff',
    elevation: 10
  },
  cover: {
    width: fullWidth * 0.75,
    height: fullWidth * 0.75,
    borderRadius: fullWidth * 0.75 / 2,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'roboto',
    position: 'absolute',
    left: fullWidth * 0.075,
    top: fullHeight * 0.58,
    width: 250,
    color: '#606060',
    fontSize: 18
  },
  artist: {
    fontFamily: 'roboto_light',
    position: 'absolute',
    left: fullWidth * 0.075,
    top: fullHeight * 0.63,
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
  mute: {
    position: 'absolute',
    bottom: fullHeight * 0.12,
    right: fullWidth * 0.07,
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
  playButton: {
    position: 'absolute',
    bottom: fullHeight * 0.11,
    left: fullWidth / 2 - 37 / 2
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
