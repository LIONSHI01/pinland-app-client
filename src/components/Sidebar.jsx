import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import { BsArrowBarRight } from 'react-icons/bs';
import logo from '../assets/logo.png';
import { categories } from '../utils/dataQuery';

// const categories = [
//   { name: 'animals' },
//   { name: 'wallpaper' },
//   { name: 'photography' },
//   { name: 'gaming' },
//   { name: 'cat' },
//   { name: 'others' },
// ];

const SidebarContainer = styled.nav`
  background-color: var(--white);
  height: 100vh;
  width: 18rem;
  /* position: fixed; */
  /* top: 0;
  left: 0; */
  padding: 2rem 0 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .category-col {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .logo {
    padding-left: 1.5rem;
    display: flex;
    gap: 0.5rem;

    align-items: center;

    p {
      font-size: var(--fs-x);
    }
  }

  .logo-icon {
    width: 3rem;
    height: 3rem;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .heading {
    display: block;
    font-size: var(--fs-s);
    font-weight: 500;
    text-transform: capitalize;
    padding-left: 1.5rem;
    padding-bottom: 1rem;

    border-bottom: 2px solid var(--grey-light-2);
  }

  .link {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: var(--fs-s);
    padding-left: 1.5rem;
    padding-right: 1rem;
    text-transform: capitalize;

    :hover p {
      color: var(--black);
      font-weight: 600;
    }

    img {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
    }
    p {
      font-size: 1.4rem;
      transition: all 0.3s;
    }
  }

  .ActiveLink {
    transition: all 0.3s;
    border-right: 2px solid var(--red);
    font-weight: 600;
  }

  .inActiveLink {
    color: var(--black-light);
  }
`;

const UserContainer = styled.div`
  /* background-color: orangered; */
  padding: 0.5rem 1.5rem;
  border-radius: var(--br-s);
  box-shadow: var(--bs-s);
  margin: 0 0.5rem;
  .user-link {
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      font-size: var(--fs-s);
    }
  }
  .user-image {
    height: 3rem;
    width: 3rem;
    border-radius: 200px;
  }
  .arrow {
    margin-left: auto;
    /* margin-right: 1rem; */
  }
`;

const handleCloseSidebar = () => {};

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className="category-col">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" className="logo-icon" />
          <h2>Pin Land</h2>
        </Link>
        <div className="links">
          <h3 className="heading">Explore</h3>
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              key={category.name}
              className={({ isActive }) =>
                isActive ? 'ActiveLink link' : 'inActiveLink link'
              }
              onClick={handleCloseSidebar}
            >
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
      {/* {loginedUser && (
        <UserContainer>
          <Link
            to={`user-profile/${loginedUser._id}`}
            className="user-link"
            onClick={handleCloseSidebar}
          >
            <img
              src={loginedUser.image}
              className="user-image"
              alt="user-profile-pic"
            />
            <p>{loginedUser.userName}</p>
            <BsArrowBarRight size={20} className="arrow" />
          </Link>
        </UserContainer>
      )} */}
    </SidebarContainer>
  );
};

export default Sidebar;
