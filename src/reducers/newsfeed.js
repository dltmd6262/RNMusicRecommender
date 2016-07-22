import {UPDATE_ADD_RESULT, UPDATE_NEWSFEED_CARDS} from '../actions/newsfeed';

const newsfeed = (state = {}, action) => {
  switch (action.type) {
    // Update newsfeed card data
    case UPDATE_NEWSFEED_CARDS:
      return {
        ...state,
        newsfeedCardData: [...action.newsfeedSnapshot],
      };

    // Update newsfeed card data with the new card created by user
    case UPDATE_ADD_RESULT:
      return {
        ...state,
        addNewsfeedResult: action.addNewsfeedResult,
      };
    default:
      return state;
  }
};

export default newsfeed
