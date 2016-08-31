import {UPDATE_FILE_STRUCTURE} from '../actions/files';

const files = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FILE_STRUCTURE:
      return {
        ...state,
        files: action.files,
      };
    default:
      return state;
  }
};

export default files
