import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

// import { device } from '../devices';
import { Overlay, IconButton } from './index';

const SidebarContainer = styled.div`
  height: 100vh;
  width: 80vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--white);
  padding: 2rem;
  z-index: 2000;
  transition: all 0.3s;

  /*transform:translateX(-100%)*/
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
    /* transition: all 0.3s; */

    :hover {
      background-color: var(--grey-light-1);
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
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

  img {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
  }

  p {
    font-size: var(--fs-s);
  }
`;

const MobileSidebar = ({ categories, showSidebar, setShowSidebar }) => {
  return (
    <>
      <SidebarContainer showSidebar={showSidebar}>
        <button className="close-btn" onClick={() => setShowSidebar(false)}>
          <IoMdClose size={20} />
        </button>
        <div className="links">
          {categories.map((category) => (
            <Link
              to={`/category/${category.name}`}
              key={category.name}
              className="link"
              onClick={() => setShowSidebar(false)}
            >
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </Link>
          ))}
        </div>
      </SidebarContainer>
      <Overlay state={showSidebar} setState={setShowSidebar} />
    </>
  );
};

export default MobileSidebar;
