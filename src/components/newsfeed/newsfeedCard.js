'use strict';

import _ from 'lodash';
import React from 'react';
import ReactNative from 'react-native';
import Shapes from '../../shapes/cssShapes';
import Styles from '../../styles';

let {
  Text,
  View,
  TouchableOpacity,
} = ReactNative;

let NewsfeedCard = ({title, artist, instrument}) => {
  let cardTitle = _.template('<%=title%> - <%=artist%>')({title, artist});

  return (
    <TouchableOpacity style={Styles.card} activeOpacity={255}>
      <View style={Styles.header}>
        <Text style={Styles.title}>{cardTitle}</Text>
        <Text style={Styles.instrument}>{instrument}</Text>
      </View>
      <View style={Shapes.line}></View>
    </TouchableOpacity>
  );
};

export default NewsfeedCard;
