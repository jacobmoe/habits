import React from 'react'
import HabitCalendar from './HabitCalendar'
import { generateCalendarValues } from '../utils'

const HabitRow = ({ name, dates }) => {
  return (
    <div className="row" style={{marginBottom: "20px"}}>
      <div className="one-third column">
        <h5>{name}</h5>
      </div>
      <div className="two-thirds column">
        <HabitCalendar values={generateCalendarValues(dates, name)} />
      </div>
    </div>
  )
}

export default HabitRow
