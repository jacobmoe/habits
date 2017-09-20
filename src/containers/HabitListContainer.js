import { connect } from 'react-redux'
import HabitList from '../components/HabitList'

const mapStateToProps = (state) => {
  return {
    habits: state.habits,
    dates: state.dates
  }
}

const mapDispatchToProps = (dispatch) => ({
})

const HabitListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitList)

export default HabitListContainer
