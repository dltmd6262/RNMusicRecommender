'use strict';

const expect = require('chai').expect;

import login from '../reducers/login';
import {SET_UID} from  '../actions/login';

describe('Login reducer test', function () {
  it('empty uid should return empty uid', function () {
    expect(login(undefined, {})).to.deep.equal({});
  });

  it('uid should not be empty', function () {
    expect(login({otherField: 1}, {type: SET_UID, uid: 'test_uid'}))
      .to.deep.equal({uid: 'test_uid', otherField: 1});
  });

  it('uid should be replaced', function () {
    expect(login({uid: 'first_uid'}, {type: SET_UID, uid: 'second_uid'}))
      .to.deep.equal({uid: 'second_uid'});
  });
});
