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

function customTitleForValue(value) {
  return value ? `You're hovering over ${value.date.toDateString()} with value ${value.count}` : null;
}

function customOnClick(value) {
  if (value) {
    alert(`Clicked on ${value.date.toDateString()} with value ${value.count}`);
  }
}

const customTooltipDataAttrs = { 'data-toggle': 'tooltip' };

const HabitCalendar = ({ values }) => {
  return (
    <CalendarHeatmap
      values={values}
      classForValue={gitlabClassForValue}
      titleForValue={customTitleForValue}
      tooltipDataAttrs={customTooltipDataAttrs}
      onClick={customOnClick}
    />
  )
}

export default HabitCalendar
