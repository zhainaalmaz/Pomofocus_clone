import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Timer.module.css';
import Button from '../UI/Button/Button';
import CountTime from './CountTime';
import skipIcon from '../../assets/Group.png';
import { setMode } from '../store/timerSlice';
import { MODES, COLORS } from '../utils/constants';
import Progress from '../UI/Progress/Progress';

const Timer = () => {
  const dispatch = useDispatch();

  const intervalRef = useRef(null);
  const { pomodoroTime, shortBreakTime, longBreakTime, longBreakInterval } =
    useSelector((state) => state.timer);
  const bgColor = useSelector((state) => state.timer.globalStyle);
  const mode = useSelector((state) => state.timer.mode);
  const autoStartBreak = useSelector((state) => state.timer.autoBreaks);
  const autoStartPomodoro = useSelector((state) => state.timer.autoPomodoros);
  const [timer, setTimer] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState({
    min: mode.time,
    sec: 0,
  });
  const [autoBr, setAutoBr] = useState(autoStartBreak);
  const [autoPom, setautoPom] = useState(autoStartPomodoro);
  const [pomodoroCycle, setPomodoroCycle] = useState(0);
  const [progress, setProgress] = useState(0);
  const percentage = (progress / (mode.time * 60)) * 100;

  useEffect(() => setTime({ min: mode.time, sec: 0 }), [mode]);

  const auto = useCallback(() => {
    setAutoBr(autoStartBreak);
    setautoPom(autoStartPomodoro);
  }, [autoStartBreak, autoStartPomodoro]);

  useEffect(() => {
    auto();
  }, [auto]);

  const updateTimer = (timeData) => {
    const updatedTime = { ...timeData };
    if (updatedTime.sec > 0) {
      updatedTime.sec--;
    } else if (updatedTime.min > 0 && updatedTime.sec === 0) {
      updatedTime.min--;
      updatedTime.sec = 59;
    }
    return updatedTime;
  };

  const startTimer = useCallback(() => {
    if (mode.name === MODES.POMODORO) {
      setPomodoroCycle((prevState) => prevState + 1);
    }
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => prev + 1);
      setTime((prevState) => updateTimer(prevState));
    }, 100);
    setTimer(intervalRef.current);
  }, [mode.name]);

  useEffect(() => {
    if (time.sec === 0 && time.min === 0) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      if (mode.name === MODES.POMODORO) {
        if (pomodoroCycle === longBreakInterval) {
          startLongBreakTimer();
        } else {
          startShortBreakTimer();
        }
      } else if (mode.name === MODES.SHORT_BREAK) {
        startPomodoroTimer();
      } else if (mode.name === MODES.LONG_BREAK) {
        startPomodoroTimer();
      }
    }
  }, [time]);

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(timer);
  };

  const timerSwitcher = () => {
    isActive ? stopTimer() : startTimer();
  };

  const changeTimer = (mode) => {
    if (isActive) {
      dispatch(
        setMode({
          name: mode.name,
          bgColor: mode.bgColor,
          time: mode.time,
        })
      );
      // stopTimer();
    } else {
      dispatch(
        setMode({
          name: mode.name,
          bgColor: mode.bgColor,
          time: mode.time,
        })
      );
    }
    stopTimer();
  };

  const startPomodoroTimer = () => {
    setProgress(0);
    setTime({ min: pomodoroTime, sec: 0 });
    changeTimer({
      name: MODES.POMODORO,
      bgColor: COLORS[MODES.POMODORO],
      time: pomodoroTime,
    });
    autoPom ? startTimer() : stopTimer();
  };

  const startShortBreakTimer = () => {
    setProgress(0);
    setTime({ min: shortBreakTime, sec: 0 });
    changeTimer({
      name: MODES.SHORT_BREAK,
      bgColor: COLORS[MODES.SHORT_BREAK],
      time: shortBreakTime,
    });
    console.log(autoPom);
    autoBr ? startTimer() : stopTimer();
  };

  const startLongBreakTimer = () => {
    setPomodoroCycle(0);
    setProgress(0);
    setTime({ min: longBreakTime, sec: 0 });
    changeTimer({
      name: MODES.LONG_BREAK,
      bgColor: COLORS[MODES.LONG_BREAK],
      time: longBreakTime,
    });
    autoBr ? startTimer() : stopTimer();
  };

  const skipTimer = () => {
    if (
      window.confirm(
        'Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)'
      )
    ) {
      if (mode.name === MODES.POMODORO) {
        if (pomodoroCycle === longBreakInterval) {
          startLongBreakTimer();
        } else {
          startShortBreakTimer();
        }
      } else if (mode.name === MODES.SHORT_BREAK) {
        startPomodoroTimer();
      } else if (mode.name === MODES.LONG_BREAK) {
        startPomodoroTimer();
      }
    }
  };
  const btnStyle = { color: bgColor };

  useEffect(() => {
    changeTimer({
      name: MODES.POMODORO,
      bgColor: COLORS[MODES.POMODORO],
      time: pomodoroTime,
    });
  }, [pomodoroTime]);

  return (
    <>
      <div>
        <Progress percent={percentage} />
      </div>
      <div className={classes.container}>
        <div className={classes.content}>
          <ul className={classes.buttons}>
            <li>
              <Button className={classes.btn} onClick={startPomodoroTimer}>
                Pomofocus
              </Button>
            </li>
            <li>
              <Button className={classes.btn} onClick={startShortBreakTimer}>
                Short break
              </Button>
            </li>
            <li>
              <Button className={classes.btn} onClick={startLongBreakTimer}>
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
