'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {updateCurrentFolder} from '../actions/files';

import Files from './files';
import Player from './player';

const {
  View,
  Text,
  Dimensions,
  NativeModules,
  TouchableOpacity,
} = ReactNative;

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
    const {width: fullWidth, height: fullHeight} = Dimensions.get('window');

    return (
      <View style={{height: fullHeight, width: fullWidth}}>
        <View style={{width: fullWidth, height: 80, elevation: 2, backgroundColor: '#ffffff'}}>
          {
            this.props.currentFolder ?
              <TouchableOpacity style={{width: 35, height: 35, position: 'absolute', top: 33, left: 18}} activeOpacity={1} onPress={this.props.updateCurrentFolder.bind(this, null)}>
                <MaterialIcon name="arrow-back" size={35} color="#a2a2a2" />
              </TouchableOpacity> : null
          }
          <Text style={{alignSelf: 'center', marginTop: 30, fontSize: 27, color: '#afafaf', fontFamily: 'roboto_light'}}>Liston</Text>
        </View>
        <View style={{width: fullWidth, height: fullHeight - 80 - 100}}>
          <Files/>
        </View>
        <Player/>
      </View>
    )
  }
}

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
