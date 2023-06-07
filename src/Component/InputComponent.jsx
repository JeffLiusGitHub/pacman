import { useState } from 'react';
import { move, place, rotate } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setCommand, setError } from '../store/InfoSlice';
import { laptopXL, laptopL, tablet, mobile, wideScreen, laptop } from '../helper/responsive';
const InputPageContainer = styled.div`
  padding: 1rem 0rem;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${wideScreen({ fontSize: '1.5rem' })}
  ${laptopXL({ fontSize: '1rem' })}
   ${laptopL({ fontSize: '0.7rem' })}
   ${laptop({ fontSize: '1rem' })}
   ${tablet({ fontSize: '1.8rem' })}
  ${mobile({ fontSize: '1.8rem' })}
`;

const Title = styled.label`
  font-weight: 900;
  color: #ffca28;
  margin-bottom: 3rem;
  font-family: 'Press Start 2P', cursive;
  ${wideScreen({ fontSize: '1.5rem' })}
  ${laptopXL({ fontSize: '1rem' })}
   ${laptopL({ fontSize: '0.7rem' })}
   ${laptop({ fontSize: '1rem' })}
   ${tablet({ fontSize: '1rem' })}
  ${mobile({ fontSize: '0.8rem' })}
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  border-radius: 5px;
  border: 3px solid #ffca27;
  background-color: #212121;
  padding: 1rem 0;
  margin-top: 1.5rem;
  height: 3.5rem;
  font-family: 'Press Start 2P', cursive;
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  color: white;
  line-height: normal;
  background-color: transparent;
  border: none;
  height: 100%;
  background-color: #212121;
  border-color: #ffca27;
  padding: 2rem 2rem;
  text-overflow: ellipsis;
  outline: none;
  width: 80%;
  border-radius: 5px;
  color: white;
  background-color: #212121;
  border-color: #ffca27;
  font-size: 1rem;
  height: 100%;
  padding: 2rem 1rem;
  font-family: 'Press Start 2P', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  ::placeholder {
    color: rgba(136, 179, 208, 0.537);
    padding: 1rem;
    font-size: 0.8em;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    ${wideScreen({ fontSize: '1.5rem' })}
    ${laptopXL({ fontSize: '1rem' })}
   ${laptopL({ fontSize: '0.7rem' })}
   ${laptop({ fontSize: '1rem' })}
   ${tablet({ fontSize: '0.7rem' })}
  ${mobile({ fontSize: '0.5rem' })}
  }
`;

const StyledButton = styled.button`
  background-color: orange;
  color: white;
  font-family: 'Press Start 2P', cursive;
  min-height: 3rem;
  padding: 0 0.5rem;
  border: none;
  cursor: pointer;
  ${wideScreen({ fontSize: '1.5rem' })}
  ${laptopXL({ fontSize: '1rem' })}
   ${laptopL({ fontSize: '0.7rem' })}
   ${laptop({ fontSize: '1rem' })}
   ${tablet({ fontSize: '0.7rem' })}
  ${mobile({ fontSize: '0.5rem' })}
`;
const InputComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const { xLength, yLength, facingToward } = useSelector((state) => state.board);
  const { axisX, axisY, facing } = useSelector((state) => state.robot);
  const dispatch = useDispatch();
  const handleInputCommand = (inputValue) => {
    const command = inputValue.split(' ')[0];

    const commandHandlers = {
      PLACE: () => place(dispatch, inputValue, xLength, yLength, facingToward),
      MOVE: () => move(dispatch, facing, axisX, axisY, xLength, yLength),
      RIGHT: () => rotate(dispatch, 'RIGHT', facing, facingToward),
      LEFT: () => rotate(dispatch, 'LEFT', facing, facingToward),
      REPORT: () => {
        if (axisX === -1 && axisY === -1 && facing === '') {
          dispatch(setError({ error: 'Cannot report the axis before initializing' }));
        } else {
          dispatch(
            setCommand({
              command: `axisX: ${axisX} axisY: ${axisY} facing:${facing}`
            })
          );
        }
      },
      default: () => dispatch(setError({ error: 'Please check your command' }))
    };

    const commandHandler = commandHandlers[command] || commandHandlers.default;
    commandHandler();
  };
  return (
    <InputPageContainer>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleInputCommand(inputValue);
        }}>
        <Title htmlFor="command-input">Type and Press Enter...</Title>

        <InputContainer>
          <Input
            id="command-input"
            data-testid="command-input"
            placeholder="Start from here..."
            value={inputValue.toUpperCase()}
            onChange={(event) => setInputValue(event.target.value.toUpperCase())}
          />
          <StyledButton type="submit">Submit</StyledButton>
        </InputContainer>
      </form>
    </InputPageContainer>
  );
};

export default InputComponent;
