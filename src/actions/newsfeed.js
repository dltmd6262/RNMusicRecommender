'use strict';

import runSafe from '../../common/runSafe';
import NewsfeedSnapshot from '../snapshots/newsfeed';
import Config from '../config';

// Update newsfeed data
export const UPDATE_NEWSFEED_CARDS = 'UPDATE_NEWSFEED_CARDS';
export const updateNewsfeedCards = (snapshot, error) => {
  return {
    type: UPDATE_NEWSFEED_CARDS,
    newsfeedSnapshot: snapshot,
    fetchNewsfeedError: error,
  };
};

// Update newsfeed data with the new card that the user created
export const UPDATE_ADD_RESULT = 'UPDATE_ADD_RESULT';
export const updateAddResult = (result) => {
  return {
    type: UPDATE_ADD_RESULT,
    addNewsfeedResult: result
  };
};

// API call to get all newsfeed data
export const fetchNewsfeedData = () => {
  return function (dispatch) {
    return runSafe(function *() {
      let res = yield fetch(Config.address + '/newsfeed', {
        method: 'GET'
      });

      let newsfeedData = JSON.parse(yield res.text()) || [];
      let newsfeedSnapshots = newsfeedData.map(NewsfeedSnapshot.create.bind(NewsfeedSnapshot));

      dispatch(updateNewsfeedCards(newsfeedSnapshots));
    });
  };
};

// API call to add new music card
export const addNewMusic = (data) => {
  return function (dispatch) {
    return runSafe(function *() {
      let res = yield fetch(Config.address + '/newsfeed', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      dispatch(updateAddResult(res));
    });
  };
};
