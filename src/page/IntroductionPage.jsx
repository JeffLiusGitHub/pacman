import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { tablet, laptopXL, laptopL } from '../helper/responsive';
const IntroContainer = styled.div`
	width: 100%;
	padding: 1rem;
	font-family: 'Press Start 2P', cursive;
`;

const Code = styled.span`
	color: #db851c;
	font-weight: 700;
	${laptopXL({ fontSize: '2rem' })}
	${laptopL({ fontSize: '1rem' })}
  ${tablet({ fontSize: '1.5rem' })}
`;
const Content = styled.p`
	color: #ffca28;
	font-weight: 700;

	font-size: 1rem;
	white-space: pre-wrap;
	overflow-wrap: break-word;
	/* font-family: 'Press Start 2P', cursive; */
	${laptopXL({ fontSize: '2rem' })}
	${laptopL({ fontSize: '1rem' })}
  ${tablet({ fontSize: '1.5rem' })}
`;

const ButtonContainer = styled.div`
	margin-top: 20px;
	text-align: right;
	margin-right: 10px;
	margin-bottom: 10px;
`;

const IntroductionPage = ({ handleOpen }) => {
	const commandList = ['PLACE X,Y,F', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
	return (
		<IntroContainer>
			<Content>The Robot can read in commands of the following form </Content>
			<Content>
				{commandList.map((command, index) => (
					<Code key={index}>{command},</Code>
				))}
			</Content>
			<Content>Check the button to see more details.</Content>
			<ButtonContainer style={{ fontFamily: 'Press Start 2P, cursive' }}>
				<Button
					data-testid="instruction"
					color="warning"
					onClick={handleOpen}
					variant="contained"
					sx={{
						backgroundColor: '#FFCA27',
						fontWeight: 900,
					}}
				>
					<HelpOutlineIcon sx={{ mr: '5px' }} />
					Instruction
				</Button>
			</ButtonContainer>
		</IntroContainer>
	);
};

export default IntroductionPage;
