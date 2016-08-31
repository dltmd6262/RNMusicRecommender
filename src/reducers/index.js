import { combineReducers } from 'redux'
import Login from './login'
import Newsfeed from './newsfeed'
import Files from './files';

export default combineReducers({
  User: Login,
  Newsfeed: Newsfeed,
  Files: Files,
})
