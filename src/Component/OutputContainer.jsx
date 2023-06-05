import styled from 'styled-components';
import { laptopXL } from '../helper/responsive';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OutputLayout = styled.div`
	font-family: 'Press Start 2P', cursive;
	width: 50%;
	background-color: #212121;
	margin: 10px;
	height: 500px;
	border-radius: 5px;
	overflow: scroll;
	padding: 10px; /* 添加内边距 */
	${laptopXL({ width: '100%', height: '225px' })}
`;

const OutputMessage = styled.div`
	color: ${(props) => props.color};
	margin-top: 0.5rem; /* 调整 margin-top */
	font-weight: 900;
	font-size: 15px;
	margin-left: 0.625rem; /* 调整 margin-left */
`;

const OutputTitle = styled.div`
	color: #ffca27;
	padding: 10px 0; /* 添加上下内边距 */
	text-align: center; /* 居中标题文本 */
	font-weight: 900;
	font-size: 25px;
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
