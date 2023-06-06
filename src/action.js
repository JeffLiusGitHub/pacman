import { axisIsValid, facingIsValid } from './validation';
import { placeRobot, rotateRobot, moveRobot } from './store/RobotSlice';
import { setCommand, setError } from './store/InfoSlice';

export const place = (dispatch, inputCommand, xLength, yLength, facingToward) => {
  const inputValue = inputCommand.split(' ');
  const errorMessages = {
    ERROR_ADD_SPACE: 'do not add space before facing',
    ERROR_MISSING_AXIS: 'please also enter axis and facing',
    ERROR_INVALID_INPUT: 'should enter X,Y,and Facing, also notice input format',
    ERROR_INPUT: 'the input error, please check your input'
  };
  if (inputValue[2]) {
    return dispatch(setError({ error: errorMessages.ERROR_ADD_SPACE }));
  }
  if (inputValue[1] === undefined) {
    return dispatch(setError({ error: errorMessages.ERROR_MISSING_AXIS }));
  }
  const inputArray = inputValue[1]?.split(',');
  if (inputArray.length !== 3) {
    return dispatch(
      setError({
        error: errorMessages.ERROR_INVALID_INPUT
      })
    );
  }
  const [axisX, axisY, facing] = inputArray.map((item) => item?.trim().toUpperCase());
  if (
    axisIsValid(dispatch, axisX, xLength) &&
    axisIsValid(dispatch, axisY, yLength) &&
    facingIsValid(dispatch, facing, facingToward)
  ) {
    dispatch(setCommand({ command: `PLACE ${inputValue[1]}` }));
    dispatch(placeRobot({ axisX: parseInt(axisX), axisY: parseInt(axisY), facing }));
  } else {
    return dispatch(
      setError({
        error: errorMessages.ERROR_INPUT
      })
    );
  }
};

export const rotate = (dispatch, direction, facing, facingToward) => {
  const isValidFacing = facingIsValid(dispatch, facing, facingToward);
  if (!isValidFacing) {
    return dispatch(setError({ error: 'invalid facing' }));
  }

  const rotateLeft = () => {
    const index = facingToward.indexOf(facing);
    const newFacing = index === 0 ? facingToward[facingToward.length - 1] : facingToward[index - 1];
    dispatch(setCommand({ command: 'LEFT' }));
    dispatch(rotateRobot({ facing: newFacing }));
  };

  const rotateRight = () => {
    const index = facingToward.indexOf(facing);
    const newFacing = index === facingToward.length - 1 ? facingToward[0] : facingToward[index + 1];
    dispatch(setCommand({ command: 'RIGHT' }));
    dispatch(rotateRobot({ facing: newFacing }));
  };

  if (direction === 'LEFT') {
    rotateLeft();
  } else if (direction === 'RIGHT') {
    rotateRight();
  } else {
    dispatch(setError({ error: 'Wrong direction command' }));
  }
};

export const move = (dispatch, facing, axisX, axisY, xLength, yLength) => {
  const errorMessage = {
    default: 'No facing data could be found. Place the Pacman first.',
    boundary: "you cannot move any more. It's already on the boundary of the board"
  };

  const handleError = (errorType) => {
    const error = errorMessage[errorType] || errorMessage.default;
    dispatch(setError({ error }));
  };

  const performMove = (newAxisX, newAxisY) => {
    if (axisIsValid(dispatch, newAxisX, xLength) && axisIsValid(dispatch, newAxisY, yLength)) {
      dispatch(setCommand({ command: 'MOVE' }));
      dispatch(moveRobot({ axisX: newAxisX, axisY: newAxisY }));
    } else {
      handleError('boundary');
    }
  };

  const facingActions = {
    NORTH: () => performMove(axisX, axisY + 1),
    SOUTH: () => performMove(axisX, axisY - 1),
    EAST: () => performMove(axisX + 1, axisY),
    WEST: () => performMove(axisX - 1, axisY)
  };

  const action = facingActions[facing];
  if (action) {
    action();
  } else {
    handleError('default');
  }
};

export const report = (axisX, axisY, facing) => {
  return { axisX, axisY, facing };
};
