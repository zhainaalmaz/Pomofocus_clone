import { createSlice } from '@reduxjs/toolkit';
import { COLORS, MODES } from '../utils/constants';

const initialState = {
  mode: { name: MODES.POMODORO, time: 1 },
  globalStyle: COLORS[MODES.POMODORO],
  autoBreaks: false,
  autoPomodoros: false,
  longBreakInterval: 2,
  pomodoroTime: 1,
  shortBreakTime: 1,
  longBreakTime: 1,
  round: 1,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimes(state, action) {
      state.pomodoroTime = action.payload.pomoTime;
      state.shortBreakTime = action.payload.shortTime;
      state.longBreakTime = action.payload.longoTime;
      state.autoBreaks = action.payload.isAutoBreaks;
      state.autoPomodoros = action.payload.isAutoPomodoros;
    },
    setMode(state, action) {
      console.log(action);
      state.globalStyle = action.payload.bgColor;
      state.mode = action.payload;
    },
    setLongBreakInterval: (state, action) => {
      console.log(action, state);
      state.longBreakInterval = action.payload;
    },
  },
});

export const {
  setTimes,
  setMode,
  setAutoBreaks,
  setAutoPomodoros,
  setLongBreakInterval,
  setIntervalMin,
} = timerSlice.actions;

export default timerSlice.reducer;
