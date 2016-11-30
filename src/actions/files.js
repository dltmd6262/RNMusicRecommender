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

const sortFilesByFolder = (fileList) => {
  let filesList = [];
  fileList.forEach(f => {
    const splitPath = f.path.split('/');
    const folderName = splitPath[splitPath.length - 2];
    const fileIdx = filesList.findIndex(folder => folder.name === folderName);

    if (fileIdx === -1) {
      filesList.push({
        name: folderName,
        files: [f],
      })
    } else {
      filesList[fileIdx].files.push(f);
    }
  });

  return filesList;
};

export const updateFileStructure = () => {
  return function (dispatch) {
    return runSafe(function *() {
      const fileStructure = yield AsyncStorage.getItem("file_structure");
      if (fileStructure) {
        dispatch(dispatchFileStructure(JSON.parse(fileStructure)));
        NativeModules.FileSystem.getFoldersWithMusic()
          .then(f => {
            f = sortFilesByFolder(f);
            dispatch(dispatchFileStructure(f));
            AsyncStorage.setItem("file_structure", JSON.stringify(f));
          });
      } else {
        let fileStructure = yield NativeModules.FileSystem.getFoldersWithMusic();
        fileStructure = sortFilesByFolder(fileStructure);
        AsyncStorage.setItem("file_structure", JSON.stringify(fileStructure));

        dispatch(dispatchFileStructure(fileStructure));
      }
    });
  };
};

export const UPDATE_CURRENT_PLAYLIST = 'UPDATE_CURRENT_PLAYLIST';

export const updateCurrentPlaylist = (list) => {
  return {
    type: UPDATE_CURRENT_PLAYLIST,
    list,
  };
};
