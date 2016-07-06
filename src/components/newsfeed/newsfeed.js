'use strict';

import React from 'react';
import ReactNative from 'react-native';
import NewsfeedCard from './newsfeedCard';
import AddMusicLayer from './addMusicLayer';
import RefreshableListView from '../refreshableListView';
import Styles from '../../styles';

var {
  View,
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
    <View style={Styles.container}>
      <RefreshableListView
        onRefresh={fetchNewsfeedData}
        renderRow={createNewsfeedCards}
        data={newsfeedCardData}
      />
      <AddMusicLayer
        pos={{bottom: 10, right: 10}}
        addNewMusic={addNewMusic}
        addNewsfeedResult={addNewsfeedResult}
      />
    </View>
  );
};

export default Newsfeed
