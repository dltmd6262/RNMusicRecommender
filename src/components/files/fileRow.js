'use strict';

import React from 'react';
import ReactNative from 'react-native';

var {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} = ReactNative;

const {width: fullWidth, height: fullHeight} = Dimensions.get('window');
const fileIcon = require('../../asset/file.png');
const bgImg = require('../../asset/test.jpg');

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

export const FolderRow = ({name, tracks, currentMusicAlbum, onSelected}) => {
  return (
    <TouchableOpacity style={s.folder} activeOpacity={1} onPress={() => {onSelected(name)}}>
      {
        currentMusicAlbum ? <Image style={s.cover} source={{uri: 'file://' + currentMusicAlbum}} />
          : <Image style={s.cover} source={bgImg}/>
      }
      <Text numberOfLines={1} style={s.folderText}>{name}</Text>
      <Text numberOfLines={1} style={s.trackText}>{`${tracks} tracks`}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  file: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: fullWidth,
    height: 70,
  },
  folder: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: fullWidth * (1 - 0.48 * 2) / 4,
    marginRight: fullWidth * (1 - 0.48 * 2) / 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 260,
    width: fullWidth * 0.48,
    elevation: 2
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
    position: 'absolute',
    fontFamily: 'roboto_light',
    fontSize: 22,
    width: fullWidth * 0.48,
    left: 10,
    bottom: 33,
    color: '#515151',
  },
  trackText: {
    position: 'absolute',
    fontFamily: 'roboto_light',
    width: fullWidth * 0.48,
    fontSize: 15,
    left: 10,
    bottom: 12,
    color: '#7b7b7b'
  },
  dateText: {
    position: 'absolute',
    fontFamily: 'roboto',
    left: 150,
    marginTop: 95,
    color: '#7b7b7b'
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: fullWidth * 0.48,
    height: fullWidth * 0.48,
  },
});
