'use strict';

import React from 'react';
import ReactNative from 'react-native';
import Styles from '../../styles';

var {
  View,
  Image,
  Text,
  TouchableOpacity,
} = ReactNative;

export const FileRow = ({title, artist, path, onSelected}) => {
  console.log(1515, title, onSelected);

  return (
    <TouchableOpacity style={Styles.file} activeOpacity={1} onPress={() => {onSelected(path)}}>
      <Image style={{position: 'absolute', marginLeft: -160, marginTop: 10}} source={require('../../asset/file.png')}/>
      <View style={{position: 'absolute', marginTop: 13, marginLeft: -100, flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={{alignSelf: 'flex-start', color: '#361821'}}>{title}</Text>
        <Text style={{alignSelf: 'flex-start', color: '#361821'}}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const FolderRow = ({name, onSelected}) => {
  return (
    <TouchableOpacity style={Styles.file} activeOpacity={1} onPress={() => {onSelected(name)}}>
      <Image style={{position: 'absolute', marginLeft: -160, marginTop: 10}} source={require('../../asset/folder.png')}/>
      <View style={{position: 'absolute', marginTop: 17, marginLeft: -100, flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={{marginTop: 6, color: '#361821'}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

