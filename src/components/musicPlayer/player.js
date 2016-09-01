'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
  View,
  Dimensions,
} = ReactNative;

export default class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const enableTouch = this.props.isShowingPlayer ? 'auto' : 'none';

    return (
      <View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }} pointerEvents={enableTouch}>
      </View>
    )
  }
}
