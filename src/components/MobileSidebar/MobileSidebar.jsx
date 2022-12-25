import React from 'react';
import { Link } from 'react-router-dom';

import { IoMdClose } from 'react-icons/io';

import { Overlay } from '../index';
import Logo from '../../assets/logo.png';
import {
  SidebarContainer,
  HeaderWrapper,
  LinksWrapper,
} from './MobileSidebar.styles';

const MobileSidebar = ({ categories, showSidebar, setShowSidebar }) => {
  return (
    <>
      <SidebarContainer showSidebar={showSidebar}>
        <button className="close-btn" onClick={() => setShowSidebar(false)}>
          <IoMdClose size={25} />
        </button>
        <HeaderWrapper>
          <Link
            to="/"
            className="logo-container"
            onClick={() => setShowSidebar(false)}
          >
            <img src={Logo} alt="pinland-logo" />
          </Link>
          <p>Pinland</p>
        </HeaderWrapper>
        <LinksWrapper>
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
        </LinksWrapper>
      </SidebarContainer>
      <Overlay state={showSidebar} setState={setShowSidebar} />
    </>
  );
};

export default MobileSidebar;
