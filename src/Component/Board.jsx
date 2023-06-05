import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import TileComponent from './TileComponent';
import { mobile, tablet, laptop, laptopL, laptopXL, wideScreen } from '../helper/responsive';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.xLength}, 1fr);
  grid-template-rows: repeat(${(props) => props.yLength}, 1fr);
  background-color: transparent;
  ${wideScreen({ width: '1000px', height: '1000px' })}
  ${laptopXL({ width: '900px', height: '900px' })}
  ${laptopL({ width: '800px', height: '800px' })}
  ${laptop({ width: '800px', height: '800px' })}
  ${tablet({ width: '600px', height: '600px' })}
  ${mobile({ width: '400px', height: '400px' })}
`;

const Board = () => {
  const { axisX, axisY, facing } = useSelector((state) => ({
    axisX: state.robot.axisX,
    axisY: state.robot.axisY,
    facing: state.robot.facing
  }));

  const { xLength, yLength } = useSelector((state) => ({
    xLength: state.board.xLength,
    yLength: state.board.yLength
  }));

  const board = useMemo(() => {
    const tiles = [];
    for (let j = xLength - 1; j >= 0; j--) {
      for (let i = 0; i < yLength; i++) {
        const number = j + i + 2;
        let displayPacman = false;
        if (i === axisX && j === axisY) {
          displayPacman = true;
        }
        tiles.push(
          <TileComponent
            key={`${i},${j}`}
            facing={facing}
            color={number % 2 === 0 ? '#000000' : '#212121'}
            i={i}
            j={j}
            displayPacman={displayPacman}
            xLength={xLength}
          />
        );
      }
    }
    return tiles;
  }, [axisX, axisY, facing, xLength, yLength]);

  return (
    <BoardContainer xLength={xLength} yLength={yLength}>
      {board}
    </BoardContainer>
  );
};

export default Board;
