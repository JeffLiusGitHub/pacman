import styled from 'styled-components';
import { laptopXL, wideScreen, laptopL, laptop, tablet, mobile } from '../helper/responsive';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OutputLayout = styled.div`
  font-family: 'Press Start 2P', cursive;
  width: 45%;
  border-radius: 4px;
  background-color: #212121;
  margin: 10px;
  height: 400px;
  border-radius: 5px;
  overflow: scroll;
  padding: 10px; /* 添加内边距 */
  border: 1px solid #7882a4;

  ${wideScreen({ fontSize: '1.5rem' })}
  ${laptopXL({ fontSize: '1rem', width: '90%', height: '225px' })}
  ${laptopL({ fontSize: '0.7rem' })}
  ${laptop({ fontSize: '1rem' })}
  ${tablet({ fontSize: '1.8rem' })}
  ${mobile({ fontSize: '1.8rem' })}
`;

const OutputMessage = styled.div`
  color: ${(props) => props.color};
  margin-top: 0.5rem;
  font-weight: 900;
  margin-left: 0.625rem;
  ${wideScreen({ fontSize: '1.2rem' })}
  ${laptopXL({ fontSize: '0.8rem' })}
  ${laptopL({ fontSize: '0.6rem' })}
  ${laptop({ fontSize: '0.8rem' })}
  ${tablet({ fontSize: '1.8rem' })}
  ${mobile({ fontSize: '1.8rem' })}
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

  const Message = messageArray.map((message, index) => (
    <OutputMessage color={color} key={`${message}-${index}`}>
      {icon}
      {message}
    </OutputMessage>
  ));

  return (
    <OutputLayout>
      <OutputTitle>{title}</OutputTitle>
      {Message}
    </OutputLayout>
  );
};

export default OutPutContainer;
