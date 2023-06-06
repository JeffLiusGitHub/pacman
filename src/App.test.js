import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { fireEvent } from '@testing-library/react';
//intergration text
describe('No Pacman Placed', () => {
  test('should display "No facing data could be found. Place the Pacman first." when typing MOVE command and pressing enter', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'MOVE' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(
      /No facing data could be found. Place the Pacman first./i
    );
    expect(displayText).toBeInTheDocument();
  });
  test('type LEFT command then pressing enter, expect Place the Pacman first, Facing input is invalid.', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'LEFT' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(/Place the Pacman first, Facing input is invalid./i);
    expect(displayText).toBeInTheDocument();
  });

  test('type RIGHT command then pressing enter, expect Place the Pacman first, Facing input is invalid.', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'RIGHT' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(
      /No facing data could be found. Place the Pacman first./i
    );
    expect(displayText).toBeInTheDocument();
  });

  test('type REPORT command then pressing enter, expect cannot report the axis before initializing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'REPORT' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(/cannot report the axis before initializing/i);
    expect(displayText).toBeInTheDocument();
  });
});

describe('Pacman Placed', () => {
  test('PLACE Pacman correctly, expect Pacman image on the board, the corresponding axis will not be rendered', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 2,1,NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const pacmanImage = screen.getByAltText('pacman');
    const displayText = screen.getByText(/PLACE 2,1,NORTH/);
    expect(displayText).toBeInTheDocument();
    expect(screen.queryByText('[2,1]')).toBeNull();
    expect(pacmanImage).toBeInTheDocument();
  });

  test('PLACE Pacman correctly, type MOVE command then pressing enter, expect display MOVE command and corresponding axis of the Pacman disappeared', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 2,1,NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
      fireEvent.change(inputValue, { target: { value: 'MOVE' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryAllByText(/MOVE/i);
    expect(screen.queryByText('[2,2]')).toBeNull();
    //already exist one in the instruction
    expect(displayText).toHaveLength(2);
  });

  test('PLACE Pacman correctly, type LEFT command then pressing enter,expect Pacman turn left.', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 2,1,NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
      fireEvent.change(inputValue, { target: { value: 'LEFT' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const pacmanImage = screen.getByAltText('pacman');
    const style = window.getComputedStyle(pacmanImage);
    expect(style.transform).toBe('rotate( 270deg )');
  });
  test('PLACE Pacman correctly, type RIGHT command then pressing enter,expect Pacman turn left.', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 2,1,NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
      fireEvent.change(inputValue, { target: { value: 'RIGHT' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const pacmanImage = screen.getByAltText('pacman');
    const style = window.getComputedStyle(pacmanImage);
    expect(style.transform).toBe('rotate( 90deg )');
  });

  test('type REPORT command then pressing enter, expect axisX: 2 axisY: 2 facing:NORTH', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 2,1,NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
      fireEvent.change(inputValue, { target: { value: 'REPORT' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText('axisX: 2 axisY: 1 facing:NORTH');
    expect(displayText).toBeInTheDocument();
  });
});

describe('test error input', () => {
  test('type randomly character, expect Please check your command.', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'JKHIUHCN' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(/Please check your command/i);
    expect(displayText).toBeInTheDocument();
  });

  test('PLACE input without typing comma, expect do not add space before facing.', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 2 1 NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(/do not add space before facing/i);
    expect(displayText).toBeInTheDocument();
  });

  test('PLACE with wrong facing name, expect Place the Pacman first, Facing input is invalid.the input error, please check your input', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 3,4,DOWN' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(/the input error, please check your input/i);
    expect(displayText).toBeInTheDocument();
  });

  test('PLACE without any attribute,expect please also enter axis and facing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(/please also enter axis and facing/i);
    expect(displayText).toBeInTheDocument();
  });
});

describe('invalid movement', () => {
  test('PLACE the robot outside of the board, expect cannot put Pacman out of table.', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 5,5,NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
      fireEvent.change(inputValue, { target: { value: 'MOVE' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(/cannot put Pacman out of table/i);
    expect(displayText).toBeInTheDocument();
  });

  test('MOVE Pacman outside of the table, expect you cannot move any more.its already on the boundary of the board', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputValue = screen.getByTestId('command-input');
    act(() => {
      fireEvent.change(inputValue, { target: { value: 'PLACE 4,4,NORTH' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
      fireEvent.change(inputValue, { target: { value: 'MOVE' } });
      fireEvent.keyPress(inputValue, { key: 'Enter', code: 13, charCode: 13 });
    });
    const displayText = screen.queryByText(
      /you cannot move any more. It's already on the boundary of the board/i
    );
    expect(displayText).toBeInTheDocument();
  });
});

test('button details', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByTestId('instruction');
  act(() => {
    userEvent.click(buttonElement);
  });
  await waitFor(() => {
    const displayText = screen.queryByText(
      /The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. There are no other obstructions on the table surface./i
    );
    expect(displayText).toBeInTheDocument();
  });
});
