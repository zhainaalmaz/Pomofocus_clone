import { createSlice } from '@reduxjs/toolkit';
import { COLORS, INIT_TIME, MODES } from '../utils/constants';
import { getPercent } from '../utils/helpers';

const initialState = {
  mode: { name: MODES.POMODORO, time: INIT_TIME.POMODORO },
  globalStyle: COLORS[MODES.POMODORO],
  autoBreaks: false,
  autoPomodoros: false,
  longBreakInterval: 1,
  progress: 0,
  pomTime: 25,
  shortTime: 5,
  longTime: 3,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimes(state, action) {
      state.pomTime = action.payload.pomoTime;
      state.shortTime = action.payload.shorotTime;
      state.longTime = action.payload.longoTime;
    },
    setMode(state, action) {
      state.globalStyle = action.payload.bgColor;
      state.mode = action.payload;
    },
    setProgress(state, action) {
      const percent = action.payload; // 1500
      const total = state.mode.time * 60;
      state.progress = getPercent(total, percent);
    },
    setAutoBreaks(state, action) {
      console.log(state, action);
      state.autoBreaks = !state.autoBreaks;
    },
    setAutoPomodoros(state, action) {
      state.autoPomodoros = !state.autoPomodoros;
    },
    setLongBreakInterval: (state, action) => {
      state.longBreakInterval = action.payload;
    },
  },
});

export const {
  setTimes,
  setMode,
  setProgress,
  setAutoBreaks,
  setAutoPomodoros,
  setLongBreakInterval,
  mode,
} = timerSlice.actions;

export default timerSlice.reducer;
