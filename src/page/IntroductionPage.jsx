import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { tablet, laptopXL, laptopL, laptop, wideScreen, mobile } from '../helper/responsive';
const IntroContainer = styled.div`
  width: 100%;
  padding: 1rem;
  line-height: 1.5rem;
  word-wrap: break-word;
  font-family: 'Press Start 2P', cursive;
  ${wideScreen({ fontSize: '1.2rem' })}
  ${laptopXL({ fontSize: '1rem' })}
  ${laptopL({ fontSize: '1rem' })}
  ${laptop({ fontSize: '1rem' })}
  ${tablet({ fontSize: '1rem' })}
  ${mobile({ fontSize: '1rem' })}
`;

const Code = styled.span`
  color: #db851c;
  font-weight: 700;
`;
const Content = styled.p`
  color: #ffca28;
  font-weight: 700;
  white-space: pre-wrap;
  overflow-wrap: break-word;
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
            fontWeight: 900
          }}>
          <HelpOutlineIcon sx={{ mr: '5px' }} />
          Instruction
        </Button>
      </ButtonContainer>
    </IntroContainer>
  );
};
IntroductionPage.propTypes = {
  handleOpen: PropTypes.func.isRequired
};
export default IntroductionPage;
