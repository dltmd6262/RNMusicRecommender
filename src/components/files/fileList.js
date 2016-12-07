'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import {FileRow, FolderRow} from './fileRow';
import {NativeModules} from 'react-native';
import {milliToTimeString} from '../../util';

var {
  View,
  Image,
  Text,
  ListView,
  Dimensions,
  BackAndroid,
} = ReactNative;

const {width: fullWidth, height: fullHeight} = Dimensions.get('window');
const bgImg = require('../../asset/test.jpg');

const Header = (album, title) => {
  return (
    <View style={{backgroundColor: '#ffffff', height: 80, width: fullWidth}}>
      {
        album ? <Image style={{
          position: 'absolute',
          top: 100 * 0.5 / 2,
          left: 20,
          width: 100 * 0.5,
          height: 100 * 0.5,
          borderRadius: 100 * 0.5 / 2,
        }} source={{uri: 'file://' + album}} /> :
          <Image style={{
            position: 'absolute',
            top: 100 * 0.5 / 2,
            left: 20,
            width: 100 * 0.5,
            height: 100 * 0.5,
            borderRadius: 100 * 0.5 / 2,
          }} source={bgImg} />
      }
      <Text numberOfLines={1} style={{
        fontFamily: 'roboto_light',
        position: 'absolute',
        color: '#515151',
        fontSize: 22,
        width: 400,
        top: 100 * 0.5 / 2 + 5,
        left: fullWidth * 0.23,
      }} >{title}</Text>
    </View>
  )
};

export default class FileList extends Component {
  constructor(props) {
    super(props);
    this.wasShowingPlayer = false;
    this.state = {
      currentFolder: null,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('goToFolders', () => {
      if (this.state.currentFolder && !this.wasShowingPlayer) {
        this.setState({
          currentFolder: null,
        });
        this.listView.scrollTo({y: 0});
      }

      this.wasShowingPlayer = false;

      return false;
    });
  }

  static createSeparator() {
    return (
      <View style={{height: 1, backgroundColor: '#f2c492'}}/>
    );
  }

  showMusicInFolder(folderName) {
    this.setState({
      currentFolder: folderName,
    });
  }

  startPlayingMusic(path, name) {
    this.props.updateCurrentPlaylist(this.props.files.find(f => f.name === this.state.currentFolder).files);
    this.props.showMusicPlayer(true);
    this.props.playNewMusic(path, name);
  }

  render() {
    if (this.props.isShowingPlayer) {this.wasShowingPlayer = true}
    if (this.listView) this.listView.scrollTo({y: 0});
    const view = this.state.currentFolder ? FileRow : FolderRow;
    const onSelected = this.state.currentFolder ?
      this.startPlayingMusic.bind(this) : this.showMusicInFolder.bind(this);

    const data = this.state.currentFolder ?
      this.props.files.find(f => f.name === this.state.currentFolder).files.map(f => {
        return {
          title: f.title,
          artist: f.artist,
          duration: milliToTimeString(f.duration),
          path: f.path,
          onSelected
        };
      }) : this.props.files.map(f => {
        return {
          name: f.name,
          tracks: f.files.length,
          currentMusicAlbum: f.files.map(file => file.album).find(f => f),
          onSelected
        };
      });

    const currentFolder = this.props.files.find(f => f.name === this.state.currentFolder);

    return (
      <ListView
        ref={ref => this.listView = ref}
        dataSource={this.state.dataSource.cloneWithRows(data)}
        renderRow={view}
        renderHeader={this.state.currentFolder ? Header.bind(this, currentFolder.files.map(file => file.album).find(f => f), currentFolder.name) : null}
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}
        style={{backgroundColor: '#f5f5f5'}}
        renderSeparator={this.createSeparator}
      />
    )
  }
};
