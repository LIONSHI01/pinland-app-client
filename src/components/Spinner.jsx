import React from 'react';
import styled from 'styled-components';
import { Circles } from 'react-loader-spinner';

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 2rem;

  p {
    font-size: var(--fs);
  }
`;

const Spinner = ({ message }) => {
  return (
    <SpinnerContainer>
      <Circles
        type="Circles"
        color="#e23e57"
        height={50}
        width={200}
        className="spinner-style"
      />
      <p>{message}</p>
    </SpinnerContainer>
  );
};

export default Spinner;
