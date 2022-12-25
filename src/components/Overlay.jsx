import React from 'react';
import styled, { css } from 'styled-components';

const showupStyles = css`
  visibility: visible;
  opacity: 1;
`;

const blackBackground = css`
  background-color: rgba(0, 0, 0, 0.5);
`;
const whiteBackground = css`
  background-color: rgba(255, 255, 255, 0.5);
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  /* background-color: rgba(255, 255, 255, 0.659); */
  backdrop-filter: blur(10px);
  z-index: 1999;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;

  ${(props) => props.state && showupStyles}

  ${(props) => props.bgColor === 'white' && whiteBackground}
  ${(props) => props.bgColor === 'black' && blackBackground}
`;

const Overlay = ({ state = true, setState, bgColor = 'white' }) => {
  return (
    <OverlayContainer
      bgColor={bgColor}
      state={state}
      onClick={() => setState(false)}
    >
      &nbsp;
    </OverlayContainer>
  );
};

export default Overlay;
