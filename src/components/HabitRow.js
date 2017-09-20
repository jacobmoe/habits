import React from 'react'
import range from 'lodash.range';
import moment from 'moment';
import HabitCalendar from './HabitCalendar'

const today = moment(new Date())
const year = generateYear()

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, date = today, low = 0, high = 4) {
  return range(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(low, high),
    };
  })
}

function generateYear() {
  let result = []

  for (let i = 0; i < 365; i++) {
    result.push(moment(new Date()).subtract(i, 'days'))
  }

  return result
}

function generateDateValues(habitDates, name) {
  return year.map((day) => {
    let count = 0
    let dayHabits = habitDates[day.format("YYYY-MM-DD")]

    if (dayHabits && dayHabits.indexOf(name) > -1) {
      count = 1
    }

    return {
      date: day.toDate(),
      count: count
    }
  })
}

const randomValues = generateRandomValues(200);

const HabitRowWithTitle = ({ dates, title }) => {
  return (
    <div className="row" style={{marginBottom: "20px"}}>
      <div className="one-third column">
        <h5>{title}</h5>
      </div>
      <div className="two-thirds column">
        <HabitCalendar values={generateDateValues(dates, title)} />
      </div>
    </div>
  )
}

const HabitRowWithoutTitle = () => {
  return (
    <div className="row" style={{marginBottom: "20px"}}>
      <div>
        <HabitCalendar values={randomValues} />
      </div>
    </div>
  )
}

const HabitRow = ({habit, dates}) => {
  if (habit) {
    return <HabitRowWithTitle dates={dates} title={habit.name} />
  } else {
    return <HabitRowWithoutTitle />
  }
}

export default HabitRow
