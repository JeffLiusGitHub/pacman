import styled, { keyframes } from 'styled-components';
import { mobile, tablet, laptop, laptopL, laptopXL, wideScreen } from '../helper/responsive';
import Loading from '../Component/LottieAnimation';
import ghost from '../assets/ghost.json';
import pacman from '../assets/pacman.json';

const MainTitleContainer = styled.div`
  width: auto;
  background-color: #000000;
  padding: 3rem 2rem;
  grid-column: 1 / span 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Press Start 2P', cursive;
  ${laptop({
    gridColumn: '1',
    gridRow: '1'
  })}

  ${laptopL({
    gap: '2rem',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr'
  })}
`;
const TitleBorder = styled.div`
  border: 0.5rem dashed #2e63f7;
  display: flex;
  align-items: center;
  padding: 1.5rem 0rem;
  justify-content: space-evenly;

  grid-column: 2;
  grid-row: 1;
  ${laptopL({
    gridColumn: '1 / span 3',
    gridRow: '1'
  })}
`;
const Title = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #ffca28;
  border-radius: 0.5rem;
  font-weight: 900;
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-align: center;
  ${laptopXL({ fontSize: '3rem' })}
  ${laptopL({ fontSize: '1.5rem' })}
  ${tablet({ fontSize: '1.2rem' })}
  ${mobile({ fontSize: '1rem' })}
`;
const rotateScaleAnimation = keyframes`
  0% {
    transform: rotate(0) scale(1);
  }
  25% {
    transform: rotate(90deg) scale(1.2);
  }
  50% {
    transform: rotate(180deg) scale(1);
  }
  75% {
    transform: rotate(270deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;
const LeftIconContainer = styled.div`
  width: 12rem;
  animation: ${rotateScaleAnimation} 10s infinite;
  ${wideScreen({ width: '12rem' })}
  ${laptopXL({ width: '10rem' })}
  ${laptopL({ width: '8rem' })}
  ${tablet({ width: '6rem' })}
  ${mobile({ width: '4rem' })}
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3rem);
  }
  100% {
    transform: translateX(0);
  }
`;

const RightIconContainer = styled.div`
  width: 10rem;
  animation: ${slideAnimation} 4s infinite ease-in-out;
  ${wideScreen({ width: '10rem' })}
  ${laptopXL({ width: '8rem' })}
  ${laptopL({ width: '6rem' })}
  ${tablet({ width: '4rem' })}
  ${mobile({ width: '2rem' })}
`;

const LeftScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  grid-row: 1;
  grid-column: 1;
  ${wideScreen({ fontSize: '2.8rem' })}
  ${laptopXL({ fontSize: '2.5rem' })}
  ${laptopL({ fontSize: '1.5rem', gridRow: '2', gridColumn: '1' })}
  ${tablet({ fontSize: '1rem' })}
  ${mobile({ fontSize: '0.5rem' })}
`;

const RightScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  grid-column: 3;
  grid-row: 1;
  ${wideScreen({ fontSize: '2.8rem' })}
  ${laptopXL({ fontSize: '2.5rem' })}
  ${laptopL({ fontSize: '1.5rem', gridRow: '2', gridColumn: '2' })}
  ${tablet({ fontSize: '1rem' })}
  ${mobile({ fontSize: '0.5rem' })}
`;

const ScoreLabel = styled.div`
  font-weight: bold;
  color: #ffffff;
  white-space: nowrap;
`;

const ScoreValue = styled.p`
  color: #ffffff;
`;
const MainTitlePage = () => {
  return (
    <MainTitleContainer>
      <LeftScore>
        <ScoreLabel>1UP</ScoreLabel>
        <ScoreValue>3600</ScoreValue>
      </LeftScore>
      <TitleBorder>
        <LeftIconContainer>
          <Loading iconJson={pacman} />
        </LeftIconContainer>
        <Title>Pacman Simulator</Title>
        <RightIconContainer>
          <Loading iconJson={ghost} />
        </RightIconContainer>
      </TitleBorder>
      <RightScore>
        <ScoreLabel>HIGH SCORE</ScoreLabel>
        <ScoreValue>16400</ScoreValue>
      </RightScore>
    </MainTitleContainer>
  );
};

export default MainTitlePage;
