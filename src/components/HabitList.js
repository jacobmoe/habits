import React from 'react'
import HabitRow from './HabitRow'

const HabitList = ({ habits, dates }) => {
  return (
    <div>
      { Object.keys(habits).map(name =>
        <HabitRow
          dates={dates}
          name={name}
          habit={habits[name]}
          key={name} />
      )}
    </div>
  )
}

export default HabitList
