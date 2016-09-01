'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  Text,
  TouchableOpacity
} = ReactNative;

const ActionButton = ({isShowingPlayer, showMusicPlayer, saturation}) => {
  return (
    <TouchableOpacity activeOpacity={1} style={{width: 60, height: 60, borderRadius: 30, backgroundColor: `#ee9459`}} onPress={showMusicPlayer.bind(null, !isShowingPlayer)}>
      <Text style={{color: '#ffffff', fontSize: 40, alignSelf: 'center'}}>{isShowingPlayer ? '>' : '+'}</Text>
    </TouchableOpacity>
  )
};

export default ActionButton;
