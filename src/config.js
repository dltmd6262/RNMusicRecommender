export default {
  address: 'http://127.0.0.1:3000',
  soundCloud: '334ecd4221d761eec2d1e2a2984e1cf7',
}

/**
 * @typedef {Object} FileStructureResult
 * @property {Array<{fileName: string, path: string}>} files
 * @property {string} name
 */

/**
 * Mocked custom native modules for auto completion
 *
 * @memberOf NativeModules
 */
var NativeModuleMockup = {
  MusicPlayer: {
    /**
     * @param {string} path - path of the file to play
     * @return {Promise<>}
     */
    playNewMusic: function (path) {},

    /**
     * @return {Promise<>}
     */
    playCurrentMusic: function () {},

    /**
     * @return {Promise<>}
     */
    pauseCurrentMusic: function () {},

    /**
     * @param {Integer} loc Music location to jump to
     */
    jumpTo: function (loc) {},

    /**
     * @param {boolean} mute
     */
    changeMute: function (mute) {},
  },
  FileSystem: {
    /**
     * @return {Promise<Array<FileStructureResult>>}
     */
    getFoldersWithMusic: function () {},
  },
};
