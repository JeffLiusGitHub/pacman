import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { laptopXL, wideScreen, laptopL, laptop, tablet, mobile } from '../helper/responsive';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OutputLayout = styled.div`
  font-family: 'Press Start 2P', cursive;
  width: 50%;
  border-radius: 4px;
  background-color: #212121;
  margin: 5px;
  height: 400px;
  border-radius: 5px;
  overflow: scroll;
  padding: 10px;
  border: 1px solid #7882a4;
  ${wideScreen({ fontSize: '1.5rem' })}
  ${laptopXL({ fontSize: '1rem', width: '100%', height: '225px' })}
  ${laptopL({ fontSize: '1rem' })}
  ${laptop({ fontSize: '1rem' })}
  ${tablet({ fontSize: '1rem' })}
  ${mobile({ fontSize: '1rem' })}
`;

const OutputMessage = styled.div`
  display: flex;
  align-items: center;
  line-height: 2rem;
  color: ${(props) => props.color};
  margin-top: 0.5rem;
  font-weight: 900;
  margin-left: 0.625rem;
  ${wideScreen({ fontSize: '1.2rem' })}
  ${laptopXL({ fontSize: '1rem' })}
  ${laptopL({ fontSize: '1rem' })}
  ${laptop({ fontSize: '1rem' })}
  ${tablet({ fontSize: '1rem' })}
  ${mobile({ fontSize: '1rem' })}
`;

const OutputTitle = styled.div`
  color: #ffca27;
  padding: 10px 0;
  text-align: center;
  font-weight: 900;
`;

const OutPutContainer = ({ title, color, messageArray }) => {
  const icon =
    title === 'command' ? (
      <CheckCircleIcon sx={{ color: '#335d2d', fontSize: '15px', mr: 1 }} />
    ) : (
      <ErrorIcon sx={{ fontSize: '15px', mr: 1 }} />
    );

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageArray]);

  const Message = messageArray.map((message, index) => (
    <OutputMessage color={color} key={`${message}-${index}`}>
      {icon}
      {message}
    </OutputMessage>
  ));

  return (
    <OutputLayout ref={scrollRef}>
      <OutputTitle>{title}</OutputTitle>
      {Message}
    </OutputLayout>
  );
};

export default OutPutContainer;
