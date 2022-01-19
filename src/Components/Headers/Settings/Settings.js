import React, { useEffect, useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import Switch from './Switch';
import classes from './Settings.module.css';
import line10 from '../../../assets/Line 10.png';
import closeIcon from '../../../assets/close-line.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTimes,
  setLongBreakInterval,
  setAutoBreaks,
} from '../../store/timerSlice';
import Input from '../../UI/Input/Input';

const Label = ({ children }) => (
  <label className={classes.label}>{children}</label>
);

const ModalSettings = (props) => {
  const {
    autoBreaks,
    autoPomodoros,
    longBreakInterval,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
  } = useSelector((state) => state.timer);

  const dispatch = useDispatch();
  const [pomoTime, setPomTime] = useState(pomodoroTime);
  const [shortTime, setShortTime] = useState(shortBreakTime);
  const [longoTime, setLongTime] = useState(longBreakTime);
  const [isAutoBreaks, setIsAutoBreaks] = useState(autoBreaks);
  const [isAutoPomodoros, setIsAutoPomodoros] = useState(autoPomodoros);

  useEffect(() => {
    setIsAutoBreaks(autoBreaks);
    setIsAutoPomodoros(autoPomodoros);
  }, [autoBreaks, autoPomodoros]);

  const pomodoroTimeHandler = (e) => {
    setPomTime(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.showSetings();
    dispatch(
      setTimes({
        pomoTime,
        shortTime,
        longoTime,
        isAutoBreaks,
        isAutoPomodoros,
      })
    );
    // dispatch(setAutoBreaks(isAutoBreaks));
  };
  return (
    <Modal>
      <div className={classes.mainTitle}>
        <h2 className={classes.title}>Timer Settings</h2>
        <img onClick={props.showSetings} src={closeIcon} alt="close-line"></img>
      </div>
      <img className={classes.line} src={line10} alt="line10" />
      <div className={classes.subTitle}>
        <h3>Time(minutes)</h3>
      </div>

      <form>
        <div className={classes.menu}>
          <div className={classes.pomodoro}>
            <Label>Pomodoro</Label>
            <Input
              onChange={pomodoroTimeHandler}
              type="number"
              defaultValue={pomodoroTime}
            />
          </div>
          <div>
            <Label>Short Break</Label>
            <Input
              onChange={(e) => setShortTime(e.target.value)}
              type="number"
              defaultValue={shortBreakTime}
            />
          </div>
          <div>
            <Label>Long Break</Label>
            <Input
              onChange={(e) => setLongTime(e.target.value)}
              type="number"
              defaultValue={longBreakTime}
            />
          </div>
        </div>
      </form>

      <img className={classes.line} src={line10} alt="line10" />
      <div className={classes.starts}>
        <div className={classes.autStart}>
          <h2>Auto start Breaks?</h2>
          <Switch
            checked={isAutoBreaks}
            onClick={(e) => setIsAutoBreaks(!isAutoBreaks)}
          />
        </div>
        <img className={classes.line} src={line10} alt="line10" />
        <div className={classes.autStart}>
          <h2>Auto start Pomodoro?</h2>
          <Switch
            checked={isAutoPomodoros}
            onClick={(e) => setIsAutoPomodoros(!isAutoPomodoros)}
          />
        </div>
        <img className={classes.line} src={line10} alt="line10" />
        <div className={classes.autStart}>
          <h2>Long Break interval</h2>
          <Input
            defaultValue={longBreakInterval}
            type="number"
            min={1}
            onClick={(e) => dispatch(setLongBreakInterval(e.target.value))}
          />
        </div>
        <img className={classes.line} src={line10} alt="line10" />
        <div className={classes.confirm}>
          <button onClick={submitHandler}>OK</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSettings;
