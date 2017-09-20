import React from 'react'
import HabitListContainer from '../containers/HabitListContainer'
import HabitRow from './HabitRow'

const App = () => {
  return (
    <div>
      <div className="container" style={{marginTop: '10%'}}>
        <section className="header" style={{textAlign: 'center'}}>
          <h2 className="title">Habits</h2>
        </section>

        <HabitRow />
        <HabitListContainer />
      </div>
    </div>
  )
}

export default App
