'use strict';

import runSafe from '../../common/runSafe';
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
    return runSafe(function *() {
      const fileStructure = yield AsyncStorage.getItem("file_structure");

      if (fileStructure) {
        dispatch(dispatchFileStructure(JSON.parse(fileStructure)));
        NativeModules.FileSystem.getFoldersWithMusic()
          .then(f => {
            f = f.filter(folder => folder.files.length > 0);
            dispatch(dispatchFileStructure(f));
            AsyncStorage.setItem("file_structure", JSON.stringify(f));
          });
      } else {
        let fileStructure = yield NativeModules.FileSystem.getFoldersWithMusic();
        fileStructure = fileStructure.filter(f => f.files.length > 0);

        dispatch(dispatchFileStructure(fileStructure));
      }
    });
  };
};
