import { createSlice } from '@reduxjs/toolkit';

const robotSlice = createSlice({
  name: 'robot',
  initialState: {
    axisX: -1,
    axisY: -1,
    facing: ''
  },
  reducers: {
    placeRobot: (state, action) => {
      state.axisX = action.payload.axisX;
      state.axisY = action.payload.axisY;
      state.facing = action.payload.facing;
    },
    rotateRobot: (state, action) => {
      state.facing = action.payload.facing;
    },
    moveRobot: (state, action) => {
      state.axisX = action.payload.axisX;
      state.axisY = action.payload.axisY;
    }
  }
});

export const { placeRobot, rotateRobot, moveRobot, reportRobot } = robotSlice.actions;
export default robotSlice.reducer;
