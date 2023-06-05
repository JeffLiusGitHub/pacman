import { place, rotate, move } from './action';
import { axisIsValid, facingIsValid } from './validation';
import { setError, setCommand } from './store/InfoSlice';
import {
  placeRobot,
  rotateRobot,
  moveRobot,
  reportRobot,
} from './store/RobotSlice';

describe('place', () => {
  const dispatchMock = jest.fn();

  afterEach(() => {
    dispatchMock.mockClear();
  });

  it('should dispatch setError when there is a space before facing', () => {
    const inputCommand = 'PLACE 1,1, NORTH';
    place(dispatchMock, inputCommand, 5, 5, ['NORTH', 'EAST', 'SOUTH', 'WEST']);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'do not add space before facing' })
    );
  });

  it('should dispatch setError when axis and facing are not entered', () => {
    const inputCommand = 'PLACE';
    place(dispatchMock, inputCommand, 5, 5, ['NORTH', 'EAST', 'SOUTH', 'WEST']);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'please also enter axis and facing' })
    );
  });

  it('should dispatch setError when input format is incorrect', () => {
    const inputCommand = 'PLACE 1,1,NORTH,EAST';
    place(dispatchMock, inputCommand, 5, 5, ['NORTH', 'EAST', 'SOUTH', 'WEST']);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({
        error: 'should enter X,Y,and Facing, also notice input format.',
      })
    );
  });

  it('should dispatch setCommand and placeRobot actions when input is valid', () => {
    const inputCommand = 'PLACE 1,1,NORTH';
    place(dispatchMock, inputCommand, 5, 5, ['NORTH', 'EAST', 'SOUTH', 'WEST']);
    expect(dispatchMock).toHaveBeenCalledWith(
      setCommand({ command: 'PLACE 1,1,NORTH' })
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      placeRobot({ axisX: 1, axisY: 1, facing: 'NORTH' })
    );
  });

  it('should dispatch setError when input is invalid', () => {
    const inputCommand = 'PLACE 6,6,NORTH';
    place(dispatchMock, inputCommand, 5, 5, ['NORTH', 'EAST', 'SOUTH', 'WEST']);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'the input error, please check your input' })
    );
  });
});

describe('rotate', () => {
  const dispatchMock = jest.fn();

  afterEach(() => {
    dispatchMock.mockClear();
  });

  it('should dispatch setError when facing is invalid', () => {
    const direction = 'LEFT';
    const facing = 'INVALID';
    const facingToward = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    rotate(dispatchMock, direction, facing, facingToward);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'invalid facing' })
    );
  });

  it('should dispatch setCommand and rotateRobot actions when rotating left', () => {
    const direction = 'LEFT';
    const facing = 'NORTH';
    const facingToward = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    rotate(dispatchMock, direction, facing, facingToward);
    expect(dispatchMock).toHaveBeenCalledWith(setCommand({ command: 'LEFT' }));
    expect(dispatchMock).toHaveBeenCalledWith(rotateRobot({ facing: 'WEST' }));
  });

  it('should dispatch setCommand and rotateRobot actions when rotating right', () => {
    const direction = 'RIGHT';
    const facing = 'NORTH';
    const facingToward = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    rotate(dispatchMock, direction, facing, facingToward);
    expect(dispatchMock).toHaveBeenCalledWith(setCommand({ command: 'RIGHT' }));
    expect(dispatchMock).toHaveBeenCalledWith(rotateRobot({ facing: 'EAST' }));
  });

  it('should dispatch setError when direction command is wrong', () => {
    const direction = 'UP';
    const facing = 'NORTH';
    const facingToward = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    rotate(dispatchMock, direction, facing, facingToward);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'Wrong direction command' })
    );
  });
});

describe('move', () => {
  const dispatchMock = jest.fn();

  afterEach(() => {
    dispatchMock.mockClear();
  });

  it('should dispatch setError when facing is missing', () => {
    const facing = '';
    const axisX = 1;
    const axisY = 1;
    const xLength = 5;
    const yLength = 5;
    move(dispatchMock, facing, axisX, axisY, xLength, yLength);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({
        error: 'No facing data could be found. Place the Pacman first.',
      })
    );
  });

  it('should dispatch setCommand and moveRobot actions when facing is NORTH and axisIsValid is true', () => {
    const facing = 'NORTH';
    const axisX = 1;
    const axisY = 1;
    const xLength = 5;
    const yLength = 5;
    move(dispatchMock, facing, axisX, axisY, xLength, yLength);
    expect(dispatchMock).toHaveBeenCalledWith(setCommand({ command: 'MOVE' }));
    expect(dispatchMock).toHaveBeenCalledWith(
      moveRobot({ axisX: 1, axisY: 2 })
    );
  });

  it('should dispatch setError when axisIsValid is false', () => {
    const facing = 'NORTH';
    const axisX = 1;
    const axisY = 4;
    const xLength = 5;
    const yLength = 5;
    move(dispatchMock, facing, axisX, axisY, xLength, yLength);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({
        error: 'cannot put Pacman out of table',
      })
    );
  });
});

describe('axisIsValid', () => {
  const dispatchMock = jest.fn();

  afterEach(() => {
    dispatchMock.mockClear();
  });

  it('should return false and dispatch setError when axis is not a number', () => {
    const axis = 'invalid';
    const length = 5;
    const result = axisIsValid(dispatchMock, axis, length);
    expect(result).toBe(false);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'axis is invalid,should be a number' })
    );
  });

  it('should return false and dispatch setError when length is not a number', () => {
    const axis = 1;
    const length = 'invalid';
    const result = axisIsValid(dispatchMock, axis, length);
    expect(result).toBe(false);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'board length is invalid' })
    );
  });

  // Add more test cases for other scenarios
});
describe('facingIsValid', () => {
  const dispatchMock = jest.fn();

  afterEach(() => {
    dispatchMock.mockClear();
  });

  it('should return true when facing is valid', () => {
    const facing = 'NORTH';
    const facingToward = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const result = facingIsValid(dispatchMock, facing, facingToward);
    expect(result).toBe(true);
  });

  it('should return false and dispatch setError when facing is invalid', () => {
    const facing = 'INVALID';
    const facingToward = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const result = facingIsValid(dispatchMock, facing, facingToward);
    expect(result).toBe(false);
    expect(dispatchMock).toHaveBeenCalledWith(
      setError({ error: 'Place the Pacman first, Facing input is invalid.' })
    );
  });
});
