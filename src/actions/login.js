'use strict';

import co from 'co';
import Config from '../config';
import {httpGet, httpPost} from '../../common/api';

// Set user id of user in state
export const SET_UID = 'SET_UID';
export const setUID = (userData) => {
  return {
    type: SET_UID,
    uid: userData.uid,
  };
};

// Login user with the given email and password
export const login = (email, password) => {
  return function (dispatch) {
    return co(function *() {
      let res = yield httpPost(Config.address + '/user/login', {
        body: JSON.stringify({id: email, password}),
      });

      if (res.ok && res.text !== '') dispatch(setUID({uid: res.text}));
    });
  };
};

// Create new user with the given email and password
export const createUser = (email, password) => {
  return function (dispatch) {
    return co(function *() {
      let res = yield httpPost(Config.address + '/user/signup', {
        body: JSON.stringify({id: email, password}),
      });

      if (res.ok && res.text !== '') dispatch(setUID({uid: res.text}));
    });
  };
};
