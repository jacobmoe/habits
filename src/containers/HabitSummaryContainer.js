import { connect } from 'react-redux'
import HabitSummary from '../components/HabitSummary'
import { generateCalendarValues } from '../utils'

const mapStateToProps = (state) => {
  return {
    calendarValues: generateCalendarValues(state.dates)
  }
}

const mapDispatchToProps = (dispatch) => ({
})

const HabitSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitSummary)

export default HabitSummaryContainer
