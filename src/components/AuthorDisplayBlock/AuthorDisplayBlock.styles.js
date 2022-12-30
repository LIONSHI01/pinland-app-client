import styled from 'styled-components';

export const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;

  color: var(--black);

  .social-links {
    display: flex;
    gap: 1rem;
    list-style: none;
  }

  .icon-box {
    height: 2.2rem;
    width: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    svg {
      height: 2rem;
      width: 2rem;
      color: var(--black);
    }
  }
`;
