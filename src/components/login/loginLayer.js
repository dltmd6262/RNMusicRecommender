'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import Styles from '../../styles';

var {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} = ReactNative;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  _login() {
    this.props.login(this.state.email, this.state.password);
  }

  _createUser() {
    this.props.createUser(this.state.email, this.state.password);
  }

  render() {
    let content;
    if (this.props.uid) {
      content =
        <View style={Styles.container}>
          <Text>{`Logged in as ${this.props.uid}`}</Text>
        </View>
    } else {
      content =
        <View style={Styles.container}>
          <Text>Please sign in</Text>
          <Text style={s.formTitle}>Email</Text>
            <TextInput
              autoCapitalize='none'
              keyboardType='email-address'
              style={s.form}
              onChangeText={(text) => this.setState({email: text})}
            />
          <Text style={s.formTitle}>Password</Text>
            <TextInput
              autoCapitalize='none'
              secureTextEntry={true}
              style={s.form}
              onChangeText={(text) => this.setState({password: text})}
            />
          <TouchableOpacity style={[s.button, {right: 35}]} onPress={this._login.bind(this)}>
            <Text style={s.buttonTitle}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.button, {left: 35}]}
            onPress={this._createUser.bind(this)}>
            <Text style={s.buttonTitle}>Create User</Text>
          </TouchableOpacity>
        </View>
    }

    return content;
  }
}

var s = StyleSheet.create({
  form: {
    height: 40,
    borderColor: '#b06955',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 1,
  },
  formTitle: {
    color: '#b06954',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 50,
    height: 50,
    width: 100,
    backgroundColor: '#b06954',
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

export default LoginPage;
