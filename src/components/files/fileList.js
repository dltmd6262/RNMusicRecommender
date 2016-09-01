'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import {FileRow, FolderRow} from './fileRow';
import {NativeModules} from 'react-native';

var {
  View,
  ListView,
  Dimensions,
  BackAndroid,
} = ReactNative;

export default class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolder: null,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };

    BackAndroid.addEventListener('goBackToFolderList', () => {
      this.setState({
        currentFolder: null,
      });

      return true;
    });
  }

  createSeparator() {
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
    this.props.showMusicPlayer(true);
    this.props.playNewMusic(path, name);
  }

  render() {
    const view = this.state.currentFolder ? FileRow : FolderRow;
    const onSelected = this.state.currentFolder ?
      this.startPlayingMusic.bind(this) : this.showMusicInFolder.bind(this);

    const data = this.state.currentFolder ?
      this.props.files.find(f => f.name === this.state.currentFolder).files.map(f => {
        return {
          title: f.fileName,
          artist: f.path,
          path: f.path,
          onSelected
        };
      }) : this.props.files.map(f => {return {name: f.name, onSelected}});

    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(data)}
        renderRow={view}
        style={{width: Dimensions.get('window').width}}
        renderSeparator={this.createSeparator}
      />
    )
  }
};
