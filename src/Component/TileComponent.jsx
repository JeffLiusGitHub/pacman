import React from 'react';
import styled from 'styled-components';
import PacmanSvg from '../assets/Pacman.svg';
import {
	tablet,
	laptop,
	laptopL,
	laptopXL,
	wideScreen,
} from '../helper/responsive';

const Tile = styled.div`
	background-color: ${(props) => props.color};
	width: 95%;
	height: 95%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	border-radius: 3px;
	font-family: 'Press Start 2P', cursive;
	font-size: 1rem;
	border: 4px double #1923fb;
	${wideScreen({ fontSize: '1.3rem' })}
	${laptopXL({ fontSize: '1rem' })}
${laptopL({ fontSize: '1rem' })}
${laptop({ fontSize: '0.8rem' })}
${tablet({ fontSize: '0.6rem' })}

  img {
		transition-timing-function: ease-in;
		width: 50%;
		height: 50%;
		z-index: 1;
		transform: rotate(
			${(props) => {
				const rotationDegrees = {
					NORTH: '0deg',
					EAST: '90deg',
					SOUTH: '180deg',
					WEST: '270deg',
				};
				return rotationDegrees[props.facing];
			}}
		);
	}
`;

const TileComponent = ({ facing, color, i, j, displayPacman, xLength }) => {
	return (
		<Tile facing={facing} color={color} xLength={xLength} key={`${i}.${j}`}>
			{displayPacman ? (
				<img src={PacmanSvg} alt="pacman" />
			) : (
				<p>
					[ {i} , {j} ]
				</p>
			)}
		</Tile>
	);
};

export default TileComponent;
