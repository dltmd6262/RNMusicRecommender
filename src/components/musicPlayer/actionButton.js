'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  Image,
  TouchableOpacity,
  StyleSheet,
} = ReactNative;

const ActionButton = ({isShowingPlayer, isPlaying, showMusicPlayer, playCurrentMusic, pauseCurrentMusic}) => {
  let icon = isShowingPlayer ?
    isPlaying ? require('../../asset/pause.png') : require('../../asset/play.png')
    : require('../../asset/music.png');

  let callback = isShowingPlayer ?
    isPlaying ? pauseCurrentMusic : playCurrentMusic
    : showMusicPlayer.bind(null, true);

  return (
    <TouchableOpacity activeOpacity={1} style={s.button} onPress={callback}>
      <Image style={s.icon} source={icon} />
    </TouchableOpacity>
  )
};

const s = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `#ffffff`,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 5,
    tintColor: '#606060',
  },
});

export default ActionButton;
