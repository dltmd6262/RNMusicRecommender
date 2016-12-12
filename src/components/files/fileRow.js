'use strict';

import React from 'react';
import ReactNative from 'react-native';

var {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} = ReactNative;

const {width: fullWidth, height: fullHeight} = Dimensions.get('window');
const bgImg = require('../../asset/test.jpg');

export const Header = (album, title) => {
  const source = album ? {uri: 'file://' + album} : bgImg;

  return (
    <View style={{backgroundColor: '#ffffff', height: 100, width: fullWidth}}>
      <Image style={s.headerCover} source={source} />
      <Text numberOfLines={1} style={s.headerTitle} >{title}</Text>
    </View>
  )
};

export const FileRow = ({title, artist, duration, path, onSelected}) => {
  return (
    <TouchableOpacity style={s.file} activeOpacity={1} onPress={() => {onSelected(path, title)}}>
      <Text numberOfLines={1} style={s.fileTitleText}>{title}</Text>
      <Text numberOfLines={1} style={s.fileArtistText}>{artist}</Text>
      <Text numberOfLines={1} style={s.fileDurationText}>{duration}</Text>
    </TouchableOpacity>
  );
};

export const FolderRow = ({name, tracks, currentMusicAlbum, onSelected}) => {
  const source = currentMusicAlbum ? {uri: 'file://' + currentMusicAlbum} : bgImg;

  return (
    <TouchableOpacity style={s.folder} activeOpacity={1} onPress={() => {onSelected(name)}}>
      <Image style={s.cover} source={source} />
      <Text numberOfLines={1} style={s.folderText}>{name}</Text>
      <Text numberOfLines={1} style={s.trackText}>{`${tracks} tracks`}</Text>
    </TouchableOpacity>
  );
};

const fileRowHeight = 78;

const s = StyleSheet.create({
  file: {
    backgroundColor: '#ffffff',
    width: fullWidth,
    height: fileRowHeight,
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
  fileTitleText: {
    fontFamily: 'roboto_light',
    position: 'absolute',
    color: '#515151',
    fontSize: 15,
    width: 250,
    top: fileRowHeight * 0.20,
    left: fullWidth * 0.15,
  },
  fileArtistText: {
    fontFamily: 'roboto_light',
    position: 'absolute',
    color: '#a2a2a2',
    fontSize: 15,
    width: 250,
    top: fileRowHeight * 0.46,
    left: fullWidth * 0.15,
  },
  fileDurationText: {
    fontFamily: 'roboto_light',
    position: 'absolute',
    color: '#a2a2a2',
    fontSize: 15,
    top: fileRowHeight * 0.20,
    right: fullWidth * 0.1,
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
  headerCover: {
    position: 'absolute',
    top: 100 * 0.5 / 2,
    left: 20,
    width: 100 * 0.5,
    height: 100 * 0.5,
    borderRadius: 100 * 0.5 / 2,
  },
  headerTitle: {
    fontFamily: 'roboto_light',
    position: 'absolute',
    color: '#515151',
    fontSize: 22,
    width: 400,
    top: 100 * 0.5 / 2 + 5,
    left: fullWidth * 0.23,
  }
});
