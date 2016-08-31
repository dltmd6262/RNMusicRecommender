'use strict';

import co from 'co';
import { NativeModules } from 'react-native';

export const UPDATE_FILE_STRUCTURE = 'UPDATE_FILE_STRUCTURE';

const dispatchFileStructure = (files) => {
  return {
    type: UPDATE_FILE_STRUCTURE,
    files
  }
};

export const updateFileStructure = () => {
  return function (dispatch) {
    return co(function *() {
      const fileStructure = yield NativeModules.FileSystem.getFoldersWithMusic()
        .then(f => {
          return f.filter(folder => folder.files.length > 0)
        });

      dispatch(dispatchFileStructure(fileStructure));
    });
  };
};
