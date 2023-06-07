import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import OutputContainer from '../Component/OutputContainer';
import { laptopXL, laptopL } from '../helper/responsive';

const OutPutLayout = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  ${laptopXL({ flexDirection: 'column' })}
  ${laptopL({ fontSize: '2rem' })}
`;
const OutputPage = () => {
  const { errorArray } = useSelector((state) => state.info);
  const { commandArray } = useSelector((state) => state.info);
  return (
    <OutPutLayout>
      <OutputContainer title="command" color="#7882a4" messageArray={commandArray} />
      <OutputContainer title="error" color="#D82148" messageArray={errorArray} />
    </OutPutLayout>
  );
};

export default OutputPage;
