import moment from 'moment';

const maxLevel = 4
const year = generateYear()

function generateYear() {
  let result = []

  for (let i = 0; i < 365; i++) {
    result.push(moment(new Date()).subtract(i, 'days'))
  }

  return result
}

/*
  * habitDates = {
  *   "2017-01-01": ["Run", "Read", "Sleep"],
  *   "2017-01-02": ["Read"],
  *   "2017-01-03": ["Read", "Sleep"]
  * }
  */
export function generateCalendarValues(habitDates, name = null) {
  return year.map((day) => {
    let count = 0
    let dayHabits = habitDates[day.format("YYYY-MM-DD")]

    if (dayHabits) {
      // if optional name is supplied, return either 1 or 0
      // dependent on if the habit list for day contains name
      if (name) {
        if (dayHabits.indexOf(name) > -1) {
          count = 1
        }
      } else {
        if (dayHabits.length > maxLevel) {
          count = maxLevel
        } else {
          count = dayHabits.length
        }
      }
    }

    return {
      date: day.toDate(),
      count: count
    }
  })
}
