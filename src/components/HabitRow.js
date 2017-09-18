import React from 'react'
import range from 'lodash.range';
import HabitCalendar from './HabitCalendar'

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const today = new Date();

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

const randomValues = generateRandomValues(200);
const restrictedRandomValues = generateRandomValues(200, today, 0, 1);

const HabitRowWithTitle = ({ title }) => {
  return (
    <div className="row" style={{marginBottom: "20px"}}>
      <div className="one-third column">
        <h5>{title}</h5>
      </div>
      <div className="two-thirds column">
        <HabitCalendar values={restrictedRandomValues} />
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

const HabitRow = ({title}) => {
  if (title) {
    return <HabitRowWithTitle title={title} />
  } else {
    return <HabitRowWithoutTitle />
  }
}

export default HabitRow
