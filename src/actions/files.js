'use strict';

import co from 'co';
import { NativeModules, AsyncStorage } from 'react-native';

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
      const fileStructure = yield AsyncStorage.getItem("file_structure");

      if (fileStructure) {
        dispatch(dispatchFileStructure(JSON.parse(fileStructure)));
        NativeModules.FileSystem.getFoldersWithMusic()
          .then(f => {
            f = f.filter(folder => folder.files.length > 0);
            AsyncStorage.setItem("file_structure", JSON.stringify(f));
          });
      } else {
        const fileStructure = yield NativeModules.FileSystem.getFoldersWithMusic()
          .then(f => {
            return f.filter(folder => folder.files.length > 0)
          });

        dispatch(dispatchFileStructure(fileStructure));
      }
    });
  };
};
