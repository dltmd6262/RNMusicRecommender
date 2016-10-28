'use strict';

import React from 'react';
import ReactNative from 'react-native';
import Svg from 'react-native-svg-uri';

const {
  TouchableOpacity,
  StyleSheet,
} = ReactNative;

const ActionButton = ({isShowingPlayer, isPlaying, showMusicPlayer, playCurrentMusic, pauseCurrentMusic}) => {
  let icon = isShowingPlayer ?
    isPlaying ? require('../../asset/pause.svg') : require('../../asset/play.svg')
    : require('../../asset/music.svg');

  let callback = isShowingPlayer ?
    isPlaying ? pauseCurrentMusic : playCurrentMusic
    : showMusicPlayer.bind(null, true);

  return (
    <TouchableOpacity activeOpacity={1} style={s.button} onPress={callback}>
      <Svg style={{alignSelf: 'center', marginTop: 16}} width="37" height="37" source={icon}/>
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
});

export default ActionButton;
