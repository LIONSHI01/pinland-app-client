import styled, { css } from 'styled-components';

const smallSize = css`
  height: 2.5rem;
  width: 2.5rem;
`;

export const ButtonContainer = styled.button`
  border: none;
  height: 4rem;
  width: 4rem;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--white);

  transition: all 0.3s;

  ${(props) => props.size === 'small' && smallSize}

  :active {
    scale: 0.85;
  }

  :hover {
    background-color: var(--grey-light-1);
  }

  & > * {
    transition: all 0.3s;
    rotate: ${(props) => (props.rotateDown ? '90deg' : '0deg')};
  }
`;
