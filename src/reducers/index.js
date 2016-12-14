import { combineReducers } from 'redux'
import Files from './files';
import Music from './music';

export default combineReducers({
  Files: Files,
  Music: Music,
})
