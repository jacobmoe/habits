import React from 'react'
import HabitRow from './HabitRow'

const HabitList = ({ habits, dates }) => {
  return (
    <div>
      { Object.keys(habits).map(name =>
        <HabitRow
          habit={habits[name]}
          dates={dates}
          key={name}
          title={name} />
      )}
    </div>
  )
}

export default HabitList
