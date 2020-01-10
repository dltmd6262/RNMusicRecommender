"use strict";

import React, { Component } from "react";
import ReactNative from "react-native";
import { FileRow, FolderRow, Header } from "./fileRow";
import { milliToTimeString } from "../../util";

var { View, FlatList, BackHandler } = ReactNative;

export default class FileList extends Component {
  constructor(props) {
    super(props);
    this.wasShowingPlayer = false;
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener("goToFolders", () => {
      if (this.props.currentFolder && !this.wasShowingPlayer) {
        this.props.updateCurrentFolder(null);
        this.listView.scrollToOffset({ offset: 0 });
      }

      this.wasShowingPlayer = false;

      return false;
    });
  }

  componentWillReceiveProps() {
    if (this.listView) this.listView.scrollToOffset({ offset: 0 });
  }

  static createSeparator() {
    return <View style={{ height: 1, backgroundColor: "#f2c492" }} />;
  }

  showMusicInFolder(folderName) {
    if (this.listView) this.listView.scrollToOffset({ offset: 0 });
    this.props.updateCurrentFolder(folderName);
  }

  startPlayingMusic(musicInfo) {
    this.props.updateCurrentPlaylist(
      this.props.files.find(f => f.name === this.props.currentFolder).files
    );
    this.props.showMusicPlayer(true);
    this.props.playNewMusic(musicInfo);
  }

  render() {
    if (this.props.isShowingPlayer) {
      this.wasShowingPlayer = true;
    }
    const view = this.props.currentFolder ? FileRow : FolderRow;
    const onSelected = this.props.currentFolder
      ? this.startPlayingMusic
      : this.showMusicInFolder;

    const data = this.props.currentFolder
      ? this.props.files
          .find(f => f.name === this.props.currentFolder)
          .files.map(f => {
            return {
              title: f.title,
              artist: f.artist,
              duration: milliToTimeString(f.duration),
              path: f.path,
              onSelected: onSelected.bind(this, f)
            };
          })
      : this.props.files.map(f => {
          return {
            name: f.name,
            tracks: f.files.length,
            currentMusicAlbum: f.files.map(file => file.album).find(f => f),
            onSelected: onSelected.bind(this, f.name)
          };
        });

    const currentFolder = this.props.files.find(
      f => f.name === this.props.currentFolder
    );

    return (
      <FlatList
        ref={ref => (this.listView = ref)}
        data={data}
        renderItem={view}
        ListHeaderComponent={
          this.props.currentFolder
            ? Header.bind(
                this,
                currentFolder.files.map(file => file.album).find(f => f),
                currentFolder.name
              )
            : null
        }
        style={{ backgroundColor: "#f5f5f5" }}
        ItemSeparatorComponent={this.createSeparator}
      />
    );
  }
}
