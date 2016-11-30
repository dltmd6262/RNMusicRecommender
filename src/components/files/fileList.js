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

const {width: fullWidth, height: fullHeight} = Dimensions.get('window');

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
    this.props.updateCurrentPlaylist(this.props.files.find(f => f.name === folderName).files);
    this.setState({
      currentFolder: folderName,
    });
  }

  startPlayingMusic(path, name) {
    this.props.showMusicPlayer(true);
    this.props.playNewMusic(path, name);
  }

  render() {
    if (this.props.isShowingPlayer) {this.wasShowingPlayer = true}
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
      }) : this.props.files.map(f => {
        return {
          name: f.name,
          tracks: f.files.length,
          onSelected
        };
      });

    return (
      <ListView
        ref={ref => this.listView = ref}
        dataSource={this.state.dataSource.cloneWithRows(data)}
        renderRow={view}
        style={{backgroundColor: '#f5f5f5'}}
        renderSeparator={this.createSeparator}
      />
    )
  }
};
