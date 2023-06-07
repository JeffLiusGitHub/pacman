import { useState } from 'react';
import { move, place, rotate } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setCommand, setError } from '../store/InfoSlice';
import { laptopXL, laptopL, tablet, mobile, wideScreen, laptop } from '../helper/responsive';
const InputPageContainer = styled.div`
  padding: 1rem;
  width: 100%;
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
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 3px solid #ffca27;
  background-color: #212121;
  padding: 1rem;
  margin-top: 1.5rem;
  height: 50px;
  font-family: 'Press Start 2P', cursive;
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  color: white;
  background-color: transparent;
  border: none;
  height: 100%;
  /* font-size: 25px; */
  background-color: #212121;
  border-color: #ffca27;
  padding: 2rem 1rem;
  text-overflow: ellipsis;
  outline: none;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  color: white;
  background-color: #212121;
  border-color: #ffca27;
  height: 50px;
  font-size: 25px;
  padding: 2rem 1rem;
  font-family: 'Press Start 2P', cursive;
  text-overflow: ellipsis;
  ::placeholder {
    font-family: 'Press Start 2P', cursive;
    color: rgba(136, 179, 208, 0.537);
    padding: 1rem;
    font-size: 0.8em;
    text-overflow: ellipsis;
  }
`;

const StyledButton = styled.button`
  background-color: orange;
  color: white;
  font-family: 'Press Start 2P', cursive;
  min-height: 3rem;
  /* font-size: 25px; */
  padding: 0 10px;
  border: none;
  cursor: pointer;
`;
// const InputPageContainer = styled.div`
//   padding: 1rem;
//   width: 100%;
// `;
// // const TitleContainer = styled.div`
// //   display: flex;
// //   justify-content: space-between;
// //   ${wideScreen({ fontSize: '1.5rem' })}
// //   ${laptopXL({ fontSize: '1rem' })}
// //   ${laptopL({ fontSize: '0.7rem' })}
// //   ${laptop({ fontSize: '1rem' })}
// //   ${tablet({ fontSize: '1.8rem' })}
// //   ${mobile({ fontSize: '1.8rem' })}
// // `;
// const Title = styled.label`
//   /* font-size: 1rem; */
//   font-weight: 900;
//   color: #ffca28;
//   margin-bottom: 25px;
//   font-family: 'Press Start 2P', cursive;
//   /* ${laptopXL({ fontSize: '2rem' })}
//   ${laptopL({ fontSize: '1.2rem' })} */
// `;
// const Input = styled.input`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   border-radius: 5px;
//   color: white;
//   background-color: #212121;
//   border-color: #ffca27;
//   height: 50px;
//   font-size: 25px;
//   padding: 2rem 1rem;
//   font-family: 'Press Start 2P', cursive;
//   text-overflow: ellipsis;
//   /* ${laptopXL({ fontSize: '20px' })}
// 	${laptopL({ fontSize: '15px' })}
//   ${tablet({ fontSize: '15px' })}
//   ${mobile({ fontSize: '20px' })} */
//   ::placeholder {
//     color: rgba(136, 179, 208, 0.537);
//     padding: 1rem;
//     font-size: 0.8em;
//     font-family: 'Press Start 2P', cursive;
//     text-overflow: ellipsis;
//     /* ${laptopXL({ fontSize: '20px' })}
// 		${laptopL({ fontSize: '15px' })}
//     ${tablet({ fontSize: '15px' })}
//     ${mobile({ fontSize: '20px' })} */
//   }
// `;

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
            placeholder="Please type your command..."
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
