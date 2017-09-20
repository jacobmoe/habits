import { combineReducers } from 'redux'
import dates from './dates'
import habits from './habits'

export default combineReducers({
  dates,
  habits
})
