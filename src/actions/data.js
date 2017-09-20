import { setDates } from './dates'
import { setHabits } from './habits'

export function loadData () {
  return (dispatch, getState) => {
    fetch('/data.json')
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
