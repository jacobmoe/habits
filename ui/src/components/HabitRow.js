import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import range from 'lodash.range';

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const today = new Date();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, date = today) {
  return range(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  })
}

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
const randomValues = generateRandomValues(200);

const githubURL = "https://github.com/patientslikeme/react-calendar-heatmap";

const HabitRowWithTitle = ({ title }) => {
  return (
    <div className="row" style={{marginBottom: "20px"}}>
      <div className="one-third column">
        <h5>{title}</h5>
      </div>
      <div className="two-thirds column">
        <CalendarHeatmap
          values={randomValues}
          classForValue={githubClassForValue}
          titleForValue={customTitleForValue}
          tooltipDataAttrs={customTooltipDataAttrs}
          onClick={customOnClick}
        />
      </div>
    </div>
  )
}

const HabitRowWithoutTitle = () => {
  return (
    <div className="row" style={{marginBottom: "20px"}}>
      <div>
        <CalendarHeatmap
          values={randomValues}
          classForValue={githubClassForValue}
          titleForValue={customTitleForValue}
          tooltipDataAttrs={customTooltipDataAttrs}
          onClick={customOnClick}
        />
      </div>
    </div>
  )
}

const HabitRow = ({title}) => {
  if (title) {
    return <HabitRowWithTitle title={title} />
  } else {
    return <HabitRowWithoutTitle />
  }
}

export default HabitRow
