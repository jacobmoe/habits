import { setDates } from './dates'
import { setHabits } from './habits'
import moment from 'moment'

export function loadData () {
  return (dispatch, getState) => {
    fetch('/data.json?c='+moment().format("YYYY-MM-DD"))
    .then((response) => (response.json()))
    .then((json) => {
      dispatch(setDates(json.dates))
      dispatch(setHabits(json.habits))
    })
    .catch((err) => {
      console.error("error retrieving data", err)
    })
  }
}
