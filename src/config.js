/**
 * @typedef {Object} FileStructureResult
 * @property {Array.<MusicInfo>} files
 * @property {string} name
 */

/**
 * @typedef {Object} MusicInfo
 * @property {string} artist
 * @property {string} title
 * @property {string} path
 * @property {string} fileName
 * @property {string} duration
 * @property {string} album
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
    playCurrentMusic: function () {},
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
    stopSplashScreen: function() {},
  },
};
