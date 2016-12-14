'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {updateCurrentFolder} from '../actions/files';
import {connect} from 'react-redux';

import Files from './files';
import Player from './player';

const {
  View,
  Text,
  Dimensions,
  NativeModules,
  TouchableOpacity,
  StyleSheet,
} = ReactNative;

const {width: fullWidth, height: fullHeight} = Dimensions.get('window');

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      NativeModules.FileSystem.stopSplashScreen();
    }, 0);
  }

  render() {
    return (
      <View style={s.container}>
        <View style={s.header}>
          {
            this.props.currentFolder ?
              <TouchableOpacity
                style={s.backBtn}
                activeOpacity={1}
                onPress={this.props.updateCurrentFolder.bind(this, null)}
              >
                <MaterialIcon name="arrow-back" size={35} color="#a2a2a2" />
              </TouchableOpacity> : null
          }
          <Text style={s.title}>Liston</Text>
        </View>
        <View style={s.fileListContainer}>
          <Files/>
        </View>
        <Player/>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    height: fullHeight,
    width: fullWidth
  },
  header: {
    width: fullWidth,
    height: 80,
    elevation: 2,
    backgroundColor: '#ffffff'
  },
  backBtn: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 33,
    left: 18
  },
  title: {
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 27,
    color: '#afafaf',
    fontFamily: 'roboto_light'
  },
  fileListContainer: {
    width: fullWidth,
    height: fullHeight - 80 - 100
  },
});

const mapStateToProps = (state) => {
  return {
    isShowingPlayer: state.Music.isShowingPlayer,
    currentFolder: state.Files.currentFolder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentFolder: (folderName) => {
      dispatch(updateCurrentFolder(folderName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
