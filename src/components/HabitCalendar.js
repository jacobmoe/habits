import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';

function githubClassForValue(value) {
  if (!value) {
    return 'color-empty';
  }
  return `color-github-${value.count}`;
}

function gitlabClassForValue(value) {
  if (!value) {
    return 'color-empty';
  }
  return `color-gitlab-${value.count}`;
}

const HabitCalendar = ({ values }) => {
  return (
    <CalendarHeatmap
      values={values}
      classForValue={gitlabClassForValue}
    />
  )
}

export default HabitCalendar
