import { createSlice } from '@reduxjs/toolkit';

const infoSlice = createSlice({
  name: 'info',
  initialState: {
    commandArray: [],
    command: '',
    errorArray: [],
    error: '',
    isOpen: false,
  },
  reducers: {
    setCommand: (state, action) => {
      state.command = action.payload.command;
      state.commandArray.push(action.payload.command);
    },
    setError: (state, action) => {
      state.error = action.payload.error;
      state.errorArray.push(action.payload.error);
    },
    setOpen: state => {
      state.isOpen = true;
    },
    setClose: state => {
      state.isOpen = false;
    },
  },
});

export const { setCommand, setError, setOpen, setClose } = infoSlice.actions;
export default infoSlice.reducer;
