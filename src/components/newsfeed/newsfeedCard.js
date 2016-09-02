'use strict';

import _ from 'lodash';
import React from 'react';
import ReactNative from 'react-native';

let {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} = ReactNative;

let NewsfeedCard = ({title, artist, instrument}) => {
  let cardTitle = _.template('<%=title%> - <%=artist%>')({title, artist});

  return (
    <TouchableOpacity style={s.card} activeOpacity={255}>
      <View style={s.header}>
        <Text style={s.title}>{cardTitle}</Text>
        <Text style={s.instrument}>{instrument}</Text>
      </View>
      <View style={s.line}/>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  card: {
    flex: 1,
    height: 300,
    backgroundColor: '#fcdfa9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccaa91',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowRadius: 50,
    shadowColor: '#000000',
  },
  header: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: '#994950'
  },
  instrument: {
    alignSelf: 'flex-end',
    fontSize: 15,
    color: '#994950'
  },
  line: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: '#ccaa91',
  },
});

export default NewsfeedCard;
