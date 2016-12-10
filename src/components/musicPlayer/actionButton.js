'use strict';

import React from 'react';
import ReactNative from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {
  TouchableOpacity,
  StyleSheet,
} = ReactNative;

const ActionButton = ({isShowingPlayer, isPlaying, showMusicPlayer, playCurrentMusic, pauseCurrentMusic}) => {
  let callback = isShowingPlayer ?
    isPlaying ? pauseCurrentMusic : playCurrentMusic
    : showMusicPlayer.bind(null, true);

  const name = isShowingPlayer ? isPlaying ? 'pause' : 'play-arrow' : 'queue-music';

  return (
    <TouchableOpacity activeOpacity={1} style={s.button} onPress={callback}>
      <MaterialIcon name={name} size={37} color="#606060" />
    </TouchableOpacity>
  )
};

const s = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `#ffffff`,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ActionButton;
