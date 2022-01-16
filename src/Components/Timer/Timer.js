import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Timer.module.css';
import Button from '../UI/Button/Button';
import CountTime from './CountTime';
import skipIcon from '../../assets/Group.png';
import { setMode, setProgress } from '../store/timerSlice';
import { MODES, COLORS } from '../utils/constants';

const Timer = () => {
  const dispatch = useDispatch();

  const { pomTime, shortTime, longTime } = useSelector((state) => state.timer);
  const bgColor = useSelector((state) => state.timer.globalStyle);
  const mode = useSelector((state) => state.timer.mode);

  const [timer, setTimer] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);
  const [time, setTime] = React.useState({
    min: mode.time,
    sec: 0,
  });

  React.useEffect(() => setTime({ min: mode.time, sec: 0 }), [mode]);

  const perRef = useRef();
  React.useEffect(() => (perRef.current = mode.time * 60), [mode.time]);

  const percentage = () => {
    dispatch(setProgress(perRef.current--));
  };

  const startTimer = () => {
    setIsActive(true);
    let myInterval = setInterval(() => {
      percentage();
      setTime((time) => {
        const updatedInterval = { ...time };
        if (time.sec > 0) updatedInterval.sec--;
        if (time.sec === 0) {
          if (time.min === 0) {
            clearInterval(myInterval);
          } else if (time.min > 0) {
            updatedInterval.min--;
            updatedInterval.sec = 59;
          }
        }
        return updatedInterval;
      });
    }, 100);
    setTimer(myInterval);
  };

  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(timer);
  };

  const stopTimer = () => {
    pauseTimer();
    if (window.confirm('Do you want to pause the Timer?')) {
    } else {
      startTimer();
    }
  };

  const timerSwitcher = () => {
    isActive ? stopTimer() : startTimer();
  };

  const nextTimer = (session) => {
    if (isActive) {
      if (window.confirm('The timer is still running,do you want to change?')) {
        dispatch(
          setMode({
            name: session.name,
            time: session.time,
            bgColor: session.bgColor,
          })
        );
        pauseTimer();
      }
    } else {
      dispatch(
        setMode({
          name: session.name,
          time: session.time,
          bgColor: session.bgColor,
        })
      );
    }
  };

  const pomodoroTimer = () => {
    percentage();
    nextTimer({
      name: MODES.POMODORO,
      time: pomTime,
      bgColor: COLORS[MODES.POMODORO],
    });
  };

  const shortBreakTimer = () => {
    percentage();
    nextTimer({
      name: MODES.SHORT_BREAK,
      time: shortTime,
      bgColor: COLORS[MODES.SHORT_BREAK],
    });
  };

  const longBreakTimer = () => {
    percentage();
    nextTimer({
      name: MODES.LONG_BREAK,
      time: longTime,
      bgColor: COLORS[MODES.LONG_BREAK],
    });
  };

  const skipTimer = () => {
    if (MODES.POMODORO) {
      shortBreakTimer();
    } else if (MODES.SHORT_BREAK) {
      longBreakTimer();
    } else if (MODES.LONG_BREAK) {
      pomodoroTimer();
    }
  };
  const btnStyle = { color: bgColor };

  React.useEffect(() => {
    nextTimer({
      name: MODES.POMODORO,
      time: pomTime,
      bgColor: COLORS[MODES.POMODORO],
    });
  }, [pomTime]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <ul className={classes.buttons}>
            <li>
              <Button className={classes.btn} onClick={pomodoroTimer}>
                Pomofocus
              </Button>
            </li>
            <li>
              <Button className={classes.btn} onClick={shortBreakTimer}>
                Short break
              </Button>
            </li>
            <li>
              <Button className={classes.btn} onClick={longBreakTimer}>
                Long Break
              </Button>
            </li>
          </ul>
          <h1>
            <CountTime time={time} />
          </h1>
          <div className={classes.footer}>
            <button
              className={classes.button}
              onClick={timerSwitcher}
              style={btnStyle}
            >
              {isActive ? 'PAUSE' : 'START'}
            </button>

            {isActive ? (
              <img src={skipIcon} alt="skip" onClick={skipTimer} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
