'use strict';

import React from 'react';
import ReactNative from 'react-native';
import NewsfeedCard from './newsfeedCard';
import RefreshableListView from '../refreshableListView';

var {
  View,
  StyleSheet,
} = ReactNative;

var createNewsfeedCards = (d, i) => {
  return (
    <NewsfeedCard
      key={d.key || i}
      title={d.title}
      artist={d.artist}
      inst={d.instrument}>
    </NewsfeedCard>);
};

var Newsfeed = ({newsfeedCardData, fetchNewsfeedData, addNewsfeedResult, addNewMusic}) => {
  return (
    <View style={s.container}>
      <RefreshableListView
        onRefresh={fetchNewsfeedData}
        renderRow={createNewsfeedCards}
        data={newsfeedCardData}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf2e8',
  },
});

export default Newsfeed
