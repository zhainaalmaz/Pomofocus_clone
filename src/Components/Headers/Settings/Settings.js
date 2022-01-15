import React from 'react';
import Modal from '../../UI/Modal/Modal';
import Switch from './Switch';
import classes from './Settings.module.css';
import line10 from '../../../assets/Line 10.png';
import closeIcon from '../../../assets/close-line.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAutoBreaks,
  setAutoPomodoros,
  setTimes,
  setLongBreakInterval,
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
    pomTime,
    shortTime,
    longTime,
  } = useSelector((state) => state.timer);

  const dispatch = useDispatch();
  const [pomoTime, setPomTime] = React.useState(pomTime);
  const [shorotTime, setShortTime] = React.useState(shortTime);
  const [longoTime, setLongTime] = React.useState(longTime);

  const submitHandler = (e) => {
    e.preventDefault();

    props.showSetings();
    dispatch(setTimes({ pomoTime, shorotTime, longoTime }));
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
              onChange={(e) => setPomTime(e.target.value)}
              type="number"
              defaultValue={pomTime}
            />
          </div>
          <div>
            <Label>Short Break</Label>
            <Input
              onChange={(e) => setShortTime(e.target.value)}
              type="number"
              defaultValue={shortTime}
            />
          </div>
          <div>
            <Label>Long Break</Label>
            <Input
              onChange={(e) => setLongTime(e.target.value)}
              type="number"
              defaultValue={longTime}
            />
          </div>
        </div>
      </form>

      <img className={classes.line} src={line10} alt="line10" />
      <div className={classes.starts}>
        <div className={classes.autStart}>
          <h2>Auto start Breaks?</h2>
          <Switch
            checked={autoBreaks}
            on={autoBreaks}
            onClick={(e) => dispatch(setAutoBreaks(e.target.value))}
          />
        </div>
        <img className={classes.line} src={line10} alt="line10" />
        <div className={classes.autStart}>
          <h2>Auto start Pomodoro?</h2>
          <Switch
            checked={autoPomodoros}
            on={autoPomodoros}
            onClick={(e) => dispatch(setAutoPomodoros(e.target.value))}
          />
        </div>
        <img className={classes.line} src={line10} alt="line10" />
        <div className={classes.autStart}>
          <h2>Long Break interval</h2>
          <Input
            defaulValue={longBreakInterval}
            type="number"
            min={1}
            onChange={(e) => dispatch(setLongBreakInterval())}
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
