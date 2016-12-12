'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import {FileRow, FolderRow, Header} from './fileRow';
import {milliToTimeString} from '../../util';

var {
  View,
  ListView,
  BackAndroid,
} = ReactNative;

export default class FileList extends Component {
  constructor(props) {
    super(props);
    this.wasShowingPlayer = false;
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('goToFolders', () => {
      if (this.props.currentFolder && !this.wasShowingPlayer) {
        this.props.updateCurrentFolder(null);
        this.listView.scrollTo({y: 0});
      }

      this.wasShowingPlayer = false;

      return false;
    });
  }

  componentWillReceiveProps() {
    if (this.listView) this.listView.scrollTo({y: 0});
  }

  static createSeparator() {
    return (
      <View style={{height: 1, backgroundColor: '#f2c492'}}/>
    );
  }

  showMusicInFolder(folderName) {
    if (this.listView) this.listView.scrollTo({y: 0});
    this.props.updateCurrentFolder(folderName);
  }

  startPlayingMusic(path, name) {
    this.props.updateCurrentPlaylist(this.props.files.find(f => f.name === this.props.currentFolder).files);
    this.props.showMusicPlayer(true);
    this.props.playNewMusic(path, name);
  }

  render() {
    if (this.props.isShowingPlayer) {this.wasShowingPlayer = true}
    const view = this.props.currentFolder ? FileRow : FolderRow;
    const onSelected = this.props.currentFolder ?
      this.startPlayingMusic.bind(this) : this.showMusicInFolder.bind(this);

    const data = this.props.currentFolder ?
      this.props.files.find(f => f.name === this.props.currentFolder).files.map(f => {
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

    const currentFolder = this.props.files.find(f => f.name === this.props.currentFolder);

    return (
      <ListView
        ref={ref => this.listView = ref}
        dataSource={this.state.dataSource.cloneWithRows(data)}
        renderRow={view}
        renderHeader={this.props.currentFolder ?
          Header.bind(this, currentFolder.files.map(file => file.album).find(f => f), currentFolder.name) : null}
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}
        style={{backgroundColor: '#f5f5f5'}}
        renderSeparator={this.createSeparator}
      />
    )
  }
};
