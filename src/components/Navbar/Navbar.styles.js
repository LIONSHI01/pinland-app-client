import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const stickyStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: var(--bs-s);
`;

export const NavbarContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem 2.5rem;
  z-index: 1000;
  background-color: var(--white);

  ${(props) => props.sticky && stickyStyles}

  .searchbar-box {
    width: 100%;
    display: flex;
    align-items: center;
    border: 2px solid var(--black-light-3);

    padding: 0.5rem;
    background-color: var(--grey-light-1);
    border-radius: var(--br-s);
    transition: all 0.3s;
    :hover {
      border: 2px solid var(--black-light-2);
    }

    :hover .search-icon {
      color: var(--black-light-2);
    }

    :has(input:focus) {
      box-shadow: 0 0 0 0.6rem var(--blue-light-3);
    }
  }

  input {
    width: 100%;
    height: 2rem;
    border: none;
    padding: 1rem;
    background-color: var(--grey-light-1);
    outline: none;
    font-size: var(--fs-s);
    font-family: inherit;
    color: var(--black-light-2);

    :focus {
      outline: none;
    }
  }

  button {
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    border-radius: 100px;
    cursor: pointer;

    :hover {
      background-color: var(--black-light-3);
    }
  }

  .search-icon {
    color: var(--black-light-3);
    padding-left: 0.5rem;
    transition: inherit;
  }

  .user-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-pic {
    border-radius: 100px;
    height: 3.5rem;
    width: 3.5rem;
    position: relative;
    overflow: hidden;
    line-height: 0;
  }
  .add-btn {
    height: 4rem;
    width: 4rem;

    background-color: var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--br-s);
    transition: all 0.3s;

    :hover {
      background-color: var(--red-dark);
    }
    :active {
      scale: 0.85;
    }
  }
  .add-icon {
    color: var(--white);
  }
`;

export const DropdownMenu = styled.div`
  position: relative;

  .category-heading {
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .links {
    width: 25rem;
    height: 90vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(-5%, 103%);

    background-color: var(--white);
    border-radius: var(--br-s);
    padding: 1.5rem;
    box-shadow: var(--bs-s);

    z-index: 1000;
  }

  .link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;

    :hover {
      background-color: var(--grey-light-1);
      border-radius: var(--br-s);
    }
  }

  img {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
  }

  p {
    font-size: var(--fs-s);
  }
`;

export const LogoContainer = styled(Link)`
  .test-box {
    height: 5rem;
    width: 5rem;
    border-radius: 100px;
    background-color: var(--white);

    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      background-color: var(--grey-light-2);
    }
  }

  img {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
