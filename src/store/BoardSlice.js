import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    xLength: -1,
    yLength: -1,
    facingToward: ['NORTH', 'EAST', 'SOUTH', 'WEST'],
  },
  reducers: {
    setBoard: (state, action) => {
      state.xLength = action.payload.xLength;
      state.yLength = action.payload.yLength;
    },
  },
});

export const { setBoard } = boardSlice.actions;
export default boardSlice.reducer;
