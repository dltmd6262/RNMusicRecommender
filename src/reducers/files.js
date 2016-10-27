import {
  UPDATE_FILE_STRUCTURE,
  UPDATE_CURRENT_PLAYLIST,
} from '../actions/files';

const files = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FILE_STRUCTURE:
      return {
        ...state,
        files: action.files,
      };
    case UPDATE_CURRENT_PLAYLIST:
      return {
        ...state,
        playlist: action.list,
      };
    default:
      return state;
  }
};

export default files
