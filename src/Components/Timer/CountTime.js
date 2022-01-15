import React from 'react';
import classes from './CountTime.module.css';

const CountTime = (props) => {
  const { sec, min } = props.time;
  const timerMinutes = min < 10 ? `0${min}` : min;
  const timerSeconds = sec < 10 ? `0${sec}` : sec;

  return (
    <div className={classes.pomodoro}>
      <div className={classes.timer}>
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  );
};

export default CountTime;
