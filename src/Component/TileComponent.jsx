import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import PacmanSvg from '../assets/Pacman.svg';
import { tablet, laptop, laptopL, laptopXL, wideScreen } from '../helper/responsive';
const openCloseMouth = keyframes`
  0%, 100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0.6);
  }
`;

const getRotationDegrees = (facing) => {
  const rotationDegrees = {
    NORTH: '0deg',
    EAST: '90deg',
    SOUTH: '180deg',
    WEST: '270deg'
  };
  return rotationDegrees[facing];
};

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${(props) => `rotate(${getRotationDegrees(props.facing)})`};
`;

const Tile = styled.div`
  background-color: ${(props) => props.color};
  width: 95%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 3px;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  border: 4px double #1923fb;
  ${wideScreen({ fontSize: '1.3rem' })} ${laptopXL({ fontSize: '1rem' })} ${laptopL({
    fontSize: '1rem'
  })} ${laptop({ fontSize: '0.8rem' })} ${tablet({ fontSize: '0.6rem' })}
  img {
    transition-timing-function: ease-in;
    width: 50%;
    height: 50%;
    z-index: 1;
    animation: ${openCloseMouth} 0.8s infinite;
  }
`;

const TileComponent = ({ facing, color, i, j, displayPacman, xLength }) => {
  const imgRef = useRef(null);
  const controls = useAnimation();
  const facingAnimationMap = {
    NORTH: { y: [80, 0] },
    EAST: { x: [-80, 0] },
    SOUTH: { y: [-80, 0] },
    WEST: { x: [80, 0] }
  };
  useEffect(() => {
    if (imgRef.current) {
      const animationProps = {
        opacity: displayPacman ? 1 : 0,

        scale: [0.8, 1.2, 1],
        transition: { duration: 0.6, ease: 'easeOut' },
        ...(displayPacman && facingAnimationMap[facing])
      };

      controls.start(animationProps);
    }
  }, [controls, displayPacman, i, j]);

  return (
    <Tile facing={facing} color={color} xLength={xLength} key={`${i}.${j}`}>
      <motion.div
        initial={{ opacity: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        animate={controls}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {displayPacman ? (
          <ImageContainer data-testid="image-container" facing={facing}>
            <motion.img src={PacmanSvg} alt="pacman" ref={imgRef} />
          </ImageContainer>
        ) : (
          <p>
            {i} . {j}
          </p>
        )}
      </motion.div>
    </Tile>
  );
};

export default TileComponent;
