'use strict';

import React from 'react';
import ReactNative from 'react-native';

var {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackAndroid,
} = ReactNative;

const fileIcon = require('../../asset/file.png');
const folderIcon = require('../../asset/folder.png')

export const FileRow = ({title, artist, path, onSelected}) => {
  return (
    <TouchableOpacity style={s.file} activeOpacity={1} onPress={() => {onSelected(path, title)}}>
      <Image style={s.icon} source={fileIcon}/>
      <View style={s.fileTextContainer}>
        <Text style={s.fileText}>{title}</Text>
        <Text style={s.fileText}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const FolderRow = ({name, onSelected}) => {
  return (
    <TouchableOpacity style={s.file} activeOpacity={1} onPress={() => {onSelected(name)}}>
      <Image style={s.icon} source={folderIcon}/>
      <View style={s.folderTextContainer}>
        <Text style={s.folderText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  file: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  icon: {
    position: 'absolute',
    marginLeft: -160,
    marginTop: 10,
    tintColor: '#b69183',
  },
  fileTextContainer: {
    position: 'absolute',
    marginTop: 13,
    marginLeft: -100,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  folderTextContainer: {
    position: 'absolute',
    marginTop: 17,
    marginLeft: -100,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  fileText: {
    alignSelf: 'flex-start',
    color: '#361821',
  },
  folderText: {
    marginTop: 6,
    color: '#361821',
  },
});
