import React from "react-native";
import { connect } from 'react-redux'
import { login, createUser } from '../actions/login';

import LoginView from '../components/login/loginLayer';

const mapStateToProps = (state) => {
  return {
    uid: state.User.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
    createUser: (email, password) => {
      dispatch(createUser(email, password));
    },
  };
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);

export default Login
