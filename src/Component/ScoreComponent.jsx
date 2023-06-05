import styled from 'styled-components';

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #ffffff;
  text-transform: uppercase;
  grid-column: 1 / span 2;
`;

const LeftScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ScoreLabel = styled.div`
  font-weight: bold;
`;

const ScoreValue = styled.div`
  font-size: 1rem;
`;

const ScoreComponent = () => {
  return (
    <ScoreContainer>
      <LeftScore>
        <ScoreLabel>1UP</ScoreLabel>
        <ScoreValue>3600</ScoreValue>
      </LeftScore>
      <RightScore>
        <ScoreLabel>HIGH SCORE</ScoreLabel>
        <ScoreValue>16400</ScoreValue>
      </RightScore>
    </ScoreContainer>
  );
};

export default ScoreComponent;
