import styled from 'styled-components';

export const SidebarContainer = styled.div`
  height: 100vh;
  width: 80vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--white);
  padding: 3rem;
  z-index: 2000;
  transition: all 0.3s;

  transform: ${(props) =>
    props.showSidebar ? 'translateX(0%)' : 'translateX(-100%)'};

  .close-btn {
    height: 4rem;
    width: 4rem;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 3rem;
    right: 3rem;
    cursor: pointer;

    border: none;
    background-color: var(--white);

    :hover {
      background-color: var(--grey-light-1);
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: var(--mg-m);

  p {
    font-size: var(--fs);
    font-weight: 700;
  }

  .logo-container {
    padding: 1rem;
    img {
      height: 4rem;
      width: 4rem;
    }
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;

  img {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
  }

  p {
    font-size: var(--fs);
  }

  .link {
    width: 80%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;

    :hover {
      background-color: var(--grey-light-1);
      border-radius: var(--br-s);
    }
  }
`;
