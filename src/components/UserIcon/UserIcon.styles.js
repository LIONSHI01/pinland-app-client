import styled, { css } from 'styled-components';

const smallSizeStyles = css`
  height: 4rem;
  width: 4rem;
`;
const largeSizeStyles = css`
  height: 10rem;
  width: 10rem;
`;

export const UserIconWrapper = styled.main`
  .user-image {
    border-radius: 100px;

    background-color: var(--grey-light-2);

    ${(props) => props.size === 's' && smallSizeStyles}
    ${(props) => props.size === 'l' && largeSizeStyles}
  }
`;
