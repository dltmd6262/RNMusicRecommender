'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  Image,
  TouchableOpacity
} = ReactNative;

const ActionButton = ({isShowingPlayer, showMusicPlayer}) => {
  let icon = isShowingPlayer ? require('../../asset/play.png') : require('../../asset/music.png');
  let callback = isShowingPlayer ? () => {} : showMusicPlayer.bind(null, true);

  return (
    <TouchableOpacity activeOpacity={1} style={{width: 60, height: 60, borderRadius: 30, backgroundColor: `#ee9459`}} onPress={callback}>
      <Image style={{alignSelf: 'center', marginTop: 5}} source={icon} />
    </TouchableOpacity>
  )
};

export default ActionButton;
