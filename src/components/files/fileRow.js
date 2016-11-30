'use strict';

import React from 'react';
import ReactNative from 'react-native';

var {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} = ReactNative;

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
      <View style={[s.cover, {marginTop: 140 * 0.25 / 2, backgroundColor: 'transparent'}]}>
        {
          currentMusicAlbum ? <Image style={[s.cover, {left: 0}]} source={{uri: 'file://' + currentMusicAlbum}} />
            : <Image style={[s.cover, {left: 0}]} source={bgImg}></Image>
        }
      </View>
      <Text style={s.folderText}>{name}</Text>
      <Text style={s.trackText}>{`${tracks} tracks`}</Text>
      <Text style={s.dateText}>{'2016.11.04'}</Text>
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
  folder: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 140,
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
    fontFamily: 'roboto',
    fontSize: 20,
    left: 150,
    marginTop: 20,
    color: '#515151',
  },
  trackText: {
    position: 'absolute',
    fontFamily: 'roboto',
    left: 150,
    marginTop: 75,
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
    left: 15,
    width: 140 * 0.75,
    height: 140 * 0.75,
    borderRadius: 140 * 0.75 / 2,
  },
});
