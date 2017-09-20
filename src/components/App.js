import React from 'react'
import HabitListContainer from '../containers/HabitListContainer'
import HabitRow from './HabitRow'
import HabitSummaryContainer from '../containers/HabitSummaryContainer'

const App = () => {
  return (
    <div>
      <div className="container" style={{marginTop: '10%'}}>
        <section className="header" style={{textAlign: 'center'}}>
          <h2 className="title">Habits</h2>
        </section>

        <HabitSummaryContainer />
        <HabitListContainer />
      </div>
    </div>
  )
}

export default App
