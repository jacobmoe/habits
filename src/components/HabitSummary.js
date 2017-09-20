import React from 'react'
import HabitCalendar from './HabitCalendar'

const HabitSummary = ({ calendarValues }) => {
  return (
    <div className="row" style={{marginBottom: "20px"}}>
      <div>
        <HabitCalendar values={calendarValues} />
      </div>
    </div>
  )
}

export default HabitSummary
