import styled from 'styled-components';

export const PinsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .sticky-nav-gap {
    width: 100%;
    height: 8rem; //= navbar height

    background-color: var(--white);
    display: ${(props) => (props.sticky ? 'unset' : 'none')};
  }

  .content-container {
    position: relative;
    display: flex;
    padding: 14px;
    width: 100%;
  }
`;
