import { setError } from './store/InfoSlice';

export const axisIsValid = (dispatch, axis, length) => {
  if (isNaN(axis)) {
    dispatch(setError({ error: 'axis is invalid, should be a number' }));
    return false;
  }

  if (isNaN(length)) {
    dispatch(setError({ error: 'board length is invalid' }));
    return false;
  }

  if (axis === -1) {
    dispatch(setError({ error: 'Pacman cannot be placed or moved outside of the board' }));
    return false;
  }

  if (axis < 0 || axis > length - 1) {
    dispatch(setError({ error: 'cannot put Pacman out of table' }));
    return false;
    //todo more condition to be judge (if have obstacle in the future)
  }

  return true;
};

export const facingIsValid = (dispatch, facing, facingToward) => {
  if (!facingToward.includes(facing)) {
    dispatch(setError({ error: 'Place the Pacman first, Facing input is invalid.' }));
    return false;
  }

  return true;
};
