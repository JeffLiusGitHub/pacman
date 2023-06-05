import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBoard } from './store/BoardSlice';
import DisplayPage from './page/DisplayPage';
import styled from 'styled-components';
import IntroductionPage from './page/IntroductionPage';
import ModalContainer from './page/ModalContainer';
import OutputPage from './page/OutputPage';
import InputComponent from './Component/InputComponent';
import { laptopXL, tablet, laptop, laptopL } from './helper/responsive';
import MainTitlePage from './page/MainTitlePage';

const WholePageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WholePageGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;
  width: 90vw;
  max-width: 2000px;
  grid-template-rows: 24rem 1fr;
  ${laptopXL({
    gridTemplateColumns: '1fr',
    gridTemplateRows: '24rem repeat(2,auto) '
  })}
`;

const Left = styled.div`
  grid-column: 1;
  grid-row: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  ${laptopXL({
    gridColumn: '1',
    gridRow: '3'
  })}
`;

const Right = styled.div`
  grid-column: 2;
  grid-row: 2;
  padding: 1rem;
  ${laptopXL({
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
