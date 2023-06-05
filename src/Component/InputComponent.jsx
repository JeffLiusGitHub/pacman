import { useState } from 'react';
import { move, place, rotate } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setCommand, setError } from '../store/InfoSlice';
// import GameButton from '../Component/GameButton';
import { laptopXL, laptopL, tablet, mobile } from '../helper/responsive';

const InputPageContainer = styled.div`
	padding: 1rem;
	width: 100%;
`;
const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Title = styled.div`
	font-size: 1.5rem;
	font-weight: 900;
	color: #ffca28;
	margin-bottom: 25px;
	font-family: 'Press Start 2P', cursive;
	/* ${laptopXL({ fontSize: '25px' })}
	${laptopL({ fontSize: '20px' })} */
`;
const Input = styled.input`
	display: flex;
	align-items: center;
	width: 100%;
	border-radius: 3px;
	color: white;
	background-color: #212121;
	border-color: #ffca27;
	height: 50px;
	font-size: 25px;
	padding: 2rem 0;
	font-family: 'Press Start 2P', cursive;
	text-overflow: ellipsis;
	/* ${laptopXL({ fontSize: '20px' })}
	${laptopL({ fontSize: '15px' })}
  ${tablet({ fontSize: '15px' })}
  ${mobile({ fontSize: '20px' })} */
	::placeholder {
		color: rgba(136, 179, 208, 0.537);
		padding: 1rem;
		font-size: 0.8em;
		font-family: 'Press Start 2P', cursive;
		text-overflow: ellipsis;
		/* ${laptopXL({ fontSize: '20px' })}
		${laptopL({ fontSize: '15px' })}
    ${tablet({ fontSize: '15px' })}
    ${mobile({ fontSize: '20px' })} */
	}
`;

const InputComponent = () => {
	const [inputValue, setInputValue] = useState('');
	const { xLength, yLength, facingToward } = useSelector(
		(state) => state.board
	);
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
					dispatch(
						setError({ error: 'Cannot report the axis before initializing' })
					);
				} else {
					dispatch(
						setCommand({
							command: `axisX: ${axisX} axisY: ${axisY} facing:${facing}`,
						})
					);
				}
			},
			default: () => dispatch(setError({ error: 'Please check your command' })),
		};

		const commandHandler = commandHandlers[command] || commandHandlers.default;
		commandHandler();
	};
	return (
		<InputPageContainer>
			<TitleContainer>
				<Title>Type and Press Enter...</Title>
			</TitleContainer>
			<Input
				label="command-input"
				data-testid="command-input"
				placeholder="Please type your command and enter..."
				value={inputValue.toUpperCase()}
				onChange={(event) => setInputValue(event.target.value.toUpperCase())}
				onKeyPress={(event) => {
					if (event.key === 'Enter') {
						handleInputCommand(inputValue);
					}
				}}
			/>
		</InputPageContainer>
	);
};

export default InputComponent;
