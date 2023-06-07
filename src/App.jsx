import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBoard } from './store/BoardSlice';
import DisplayPage from './page/DisplayPage';
import styled from 'styled-components';
import IntroductionPage from './page/IntroductionPage';
import ModalContainer from './page/ModalContainer';
import OutputPage from './page/OutputPage';
import InputComponent from './Component/InputComponent';
import { laptop } from './helper/responsive';
import MainTitlePage from './page/MainTitlePage';

const WholePageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${laptop({ width: '95vw', padding: '0' })}
`;

const WholePageGridLayout = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  grid-column-gap: 3rem;
  grid-row-gap: 1.5rem;
  width: 90vw;
  max-width: 2000px;
  grid-template-rows: 24rem 1fr;
  ${laptop({
    gridTemplateColumns: '100%',
    gridTemplateRows: ' repeat(3,auto) ',
    gridRowGap: '1.5rem'
  })}
`;

const Left = styled.div`
  grid-column: 1;
  grid-row: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  ${laptop({
    gridColumn: '1',
    gridRow: '3',
    '> :nth-child(1)': {
      order: 3
    },
    '> :nth-child(2)': {
      order: 1
    },
    '> :nth-child(3)': {
      order: 2
    }
  })}
`;

const Right = styled.div`
  grid-column: 2;
  grid-row: 2;
  padding: 1rem;
  ${laptop({
    gridColumn: '1',
    gridRow: '2'
  })}
`;

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const boardSize = { xLength: 5, yLength: 5 };
    dispatch(setBoard(boardSize));
  }, [dispatch]);

  return (
    <WholePageLayout>
      <WholePageGridLayout>
        <MainTitlePage />
        <Left>
          <IntroductionPage handleOpen={handleOpen} />
          <ModalContainer open={open} handleClose={handleClose} />
          <InputComponent />
          <OutputPage />
        </Left>
        <Right>
          <DisplayPage />
        </Right>
      </WholePageGridLayout>
    </WholePageLayout>
  );
};

export default App;
