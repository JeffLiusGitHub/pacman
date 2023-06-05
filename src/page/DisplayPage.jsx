import React from 'react';
import Board from '../Component/Board';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 100px; */
  height: 90%;
`;
function DisplayPage() {
  return (
    <DisplayContainer>
      <Board />
    </DisplayContainer>
  );
}

export default DisplayPage;
