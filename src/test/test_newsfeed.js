'use strict';

const expect = require('chai').expect;

import newsfeed from '../reducers/newsfeed';
import {UPDATE_NEWSFEED_CARDS, UPDATE_ADD_RESULT, } from '../actions/newsfeed'

describe('Newsfeed reducer test', function () {
  it('return empty object for default', function () {
    expect(newsfeed(undefined, {type: 'unknown'})).to.deep.equal({});
  });
  it('should update newsfeed card state with empty array', function () {
    expect(newsfeed({}, {type: UPDATE_NEWSFEED_CARDS, newsfeedSnapshot: []}))
      .to.deep.equal({newsfeedCardData: []});
  });
  it('should update new newsfeed addition result', function () {
    expect(newsfeed({}, {type: UPDATE_ADD_RESULT, addNewsfeedResult: 'good'}))
      .to.deep.equal({addNewsfeedResult: 'good'});
  });
});
