const dates = (state = [], action) => {
  switch (action.type) {
  case 'SET_DATES':
    return action.dates
  default:
    return state
  }
}

export default dates
